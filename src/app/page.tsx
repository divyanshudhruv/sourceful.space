"use client";

import React, { useState, useEffect } from "react";
import { Lexend } from "next/font/google";
import { Playwrite_DK_Loopet } from "next/font/google";
import "./../once-ui/styles/background.scss";
import {
  Heading,
  Text,
  Button,
  Icon,
  InlineCode,
  Logo,
  Input,
  AvatarGroup,
  Textarea,
  SmartLink,
  Dialog,
  Line,
  Background,
  useToast,
  Fade,
  IconButton,
  TagInput,
  Switch,
  Column,
  Row,
  CompareImage,
  ThemeSwitcher,
  UserMenu,
  Flex,
  Kbar,
  Kbd,
  NumberInput,
  RevealFx,
} from "@/once-ui/components";
import { MediaUpload } from "@/once-ui/modules";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
import { supabase } from "./utils/supabase/client";
import { SourcefulCard } from "./sourceful-ui/SourcefulCard";

// Font setup
const lexend = Lexend({ subsets: ["latin"] });
const cedarville = Playwrite_DK_Loopet({ weight: "400" });

// Types
type User = {
  name: string;
  pfp: string;
};

export default function Home() {
  // State hooks
  const [idea, setIdea] = useState("");
  const [statusIndicatorColor, setStatusIndicatorColor] = useState<
    "green" | "yellow" | "red" | "gray"
  >("red");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDialogOpenForSignUp, setIsDialogOpenForSignUp] = useState(false);
  const [isDialogOpenForNewProject, setIsDialogOpenForNewProject] =
    useState(false);
  const [isCmdOpenFromButton, setIsCmdOpenFromButton] = useState(false);
  const { addToast } = useToast();

  // User state
  const [user, setUser] = useState({
    name: "User",
    pfp: "",
    subline: "Space User",
  });

  // Projects data state
  const [projectsData, setProjectsData] = useState<
    {
      project_id: string;
      title: string;
      description: string;
      media_url?: string;
      likes?: number;
      name?: string;
      pfp?: string;
      website_link?: string;
      open_for_funding?: boolean;
    }[]
  >([]);

  // Project form state
  const [project, setProject] = useState<{
    title: string;
    description: string;
    content: string;
    tags: string[];
    websiteLink: string;
    media: string;
    builtWith: string;
    openForFunding: boolean;
    fundingGoal: number;
    lookingFor: number;
    fundingPitch: string;
    isOpenForFunding: boolean;
    likes?: number;
    name?: string;
    pfp?: string;
  }>({
    title: "",
    description: "",
    content: "",
    tags: ["AI", "Web", "Open Source"],
    websiteLink: "",
    media: "",
    builtWith: "",
    openForFunding: false,
    fundingGoal: 0,
    lookingFor: 0,
    fundingPitch: "",
    isOpenForFunding: false,
    likes: 0,
    name: "",
    pfp: "",
  });

  // Fetch projects from Supabase and subscribe to realtime changes
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "project_id, title, description, media_url, likes, name, pfp, website_link,open_for_funding"
        );
      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjectsData(data);
      }
    };

    fetchProjects();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("realtime:projects")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle file upload for project cover image
  const handleFileUpload = async (file: File) => {
    const userSession = await supabase.auth.getSession();
    if (!userSession.data.session) {
      addToast({
        variant: "danger",
        message: "You must be logged in to upload a cover image.",
      });
      return;
    }

    const fileExt = file.name.split(".").pop();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    const timestamp = dateStr;
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileName = `covers/project-cover-${timestamp}-${randomStr}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("project-covers")
      .upload(fileName, file, {
        upsert: false,
        contentType: file.type,
        cacheControl: "3600",
      });

    if (error || !data || !data.path) {
      addToast({
        variant: "danger",
        message: "Failed to upload image.",
      });
      console.error("Error uploading image:", error);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("project-covers")
      .getPublicUrl(data.path);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      addToast({
        variant: "danger",
        message: "Failed to get public URL for image.",
      });
      return;
    }

    setProject((prev) => ({
      ...prev,
      media: publicUrlData.publicUrl,
    }));

    addToast({
      variant: "success",
      message: "Image uploaded successfully!",
    });
  };

  // Clear project form
  function clearProject() {
    setProject({
      title: "",
      description: "",
      content: "",
      tags: ["AI", "Web", "Open Source"],
      websiteLink: "",
      media: "",
      builtWith: "",
      openForFunding: false,
      fundingGoal: 0,
      lookingFor: 0,
      fundingPitch: "",
      isOpenForFunding: false,
    });
  }

  // Insert new project to Supabase
  async function insertProjectToSupabase() {
    const userSession = await supabase.auth.getSession();
    if (!userSession.data.session) {
      addToast({
        variant: "danger",
        message: "You must be logged in to publish a project.",
      });
      return;
    }

    if (
      !project.title.trim() ||
      !project.description.trim() ||
      !project.media.trim() ||
      !project.builtWith.trim()
    ) {
      addToast({
        variant: "danger",
        message:
          "Please fill all required fields (Title, Description, Cover image, Built with, etc).",
      });
      return;
    }

    setIsLoading(true);
    try {
      const userId = userSession.data.session?.user?.id;
      const name =
        userSession.data.session?.user?.user_metadata?.name || "User";
      const pfp =
        userSession.data.session?.user?.user_metadata?.avatar_url || "";
      const updatedProject = {
        ...project,
        likes: Math.floor(Math.random() * 30) + 65, // 70-95
        name,
        pfp,
      };
      setProject(updatedProject);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: updatedProject,
          userId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast({
          variant: "danger",
          message: data.message || "Failed to publish project.",
        });
        console.error(data.error);
      } else {
        addToast({
          variant: "success",
          message: data.message || "Project published successfully!",
        });
        clearProject();
        setIsDialogOpenForNewProject(false);
      }
    } catch (err) {
      addToast({
        variant: "danger",
        message: "An error occurred.",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch user info from Supabase on mount
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { user } = session;
        addToast({
          variant: "success",
          message: "Logged in successfully",
        });
        setUser({
          name: user.user_metadata?.name || user.email || "User",
          pfp: user.user_metadata?.avatar_url || "",
          subline: "Space User",
        });
      }
    }
    fetchUser();
  }, []);

  // Handle logout event
  useEffect(() => {
    const handleLogOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        addToast({
          variant: "danger",
          message: "Error signing out",
        });
      } else {
        setIsDialogOpenForSignUp(false);
        console.log("User signed out successfully");
        addToast({
          variant: "success",
          message: "Logged out successfully",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    window.addEventListener("log-out", handleLogOut);

    return () => {
      window.removeEventListener("log-out", handleLogOut);
    };
  }, []);

  // Handle open signup dialog event
  useEffect(() => {
    const handleOpenDialog1 = () => {
      setIsDialogOpenForSignUp(true);
    };

    window.addEventListener("open-signup-dialog", handleOpenDialog1);

    return () => {
      window.removeEventListener("open-signup-dialog", handleOpenDialog1);
    };
  }, []);

  // Handle open new project dialog event
  useEffect(() => {
    const handleOpenDialog2 = () => {
      setIsDialogOpenForNewProject(true);
    };

    window.addEventListener("open-new-project-dialog", handleOpenDialog2);

    return () => {
      window.removeEventListener("open-new-project-dialog", handleOpenDialog2);
    };
  }, []);

  // Supabase Google sign-in
  async function supabaseSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  }

  // Kbar command palette items
  const kbarItems = [
    {
      id: "home",
      name: "Home",
      section: "Navigation",
      shortcut: ["H"],
      keywords: "home main start",
      href: "/",
      icon: "home",
    },
    {
      id: "submit",
      name: "Submit Project",
      section: "Navigation",
      shortcut: ["P"],
      keywords: "submit idea startup",
      href: "javascript:window.dispatchEvent(new CustomEvent('open-new-project-dialog'))",
      icon: "document",
    },
    {
      id: "signup",
      name: "Sign Up",
      section: "Auth",
      shortcut: ["S"],
      keywords: "login signin register signup",
      href: "javascript:window.dispatchEvent(new CustomEvent('open-signup-dialog'))",
      icon: "key",
    },
    {
      id: "logout",
      name: "Log Out",
      section: "Auth",
      shortcut: ["O"],
      keywords: "logout signout signout",
      href: "javascript:window.dispatchEvent(new CustomEvent('log-out'))",
      icon: "key",
    },
    {
      id: "support",
      name: "Request deletion",
      section: "Community",
      shortcut: ["D"],
      keywords: "support delete remove account project",
      href: "https://github.com/divyanshudhruv/sourceful.space/issues",
      icon: "heart",
    },
    {
      id: "github",
      name: "Github",
      section: "Socials",
      shortcut: ["G"],
      keywords: "github code repository",
      href: "https://github.com/divyanshudhruv/sourceful.space",
      icon: "book",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      section: "Socials",
      shortcut: ["L"],
      keywords: "linkedin professional network",
      href: "https://linkedin.com/",
      icon: "linkedin",
    },
  ];

  // Search input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Clear search input
  const handleClear = () => {
    setSearchValue("");
  };

  // Submit idea for AI review
  const handleSubmit = async (prompt: string) => {
    if (!prompt) return;
    setIsLoading(true);
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    setResponse(data.generatedText.trim());
    setIsOpen(true);
    setIsLoading(false);

    if (!response.ok) {
      console.error("Error:", data);
      return;
    }
    console.log("Usage Metadata:", data.usageMetadata);
  };

  // Main render
  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center">
      {/* Scroll to top button */}
      <ScrollToTop>
        <IconButton variant="secondary" icon="chevronUp" />
      </ScrollToTop>
      {/* Top fade effect */}
      <Fade
        zIndex={3}
        pattern={{ display: true, size: "2" }}
        position="fixed"
        top="0"
        left="0"
        to="bottom"
        height={5}
        fillWidth
        blur={0.25}
      />
      {/* Fixed header */}
      <Row position="fixed" top="0" fillWidth horizontal="center" zIndex={3}>
        <Row
          data-border="rounded"
          horizontal="space-between"
          maxWidth="l"
          paddingRight="32"
          paddingLeft="32"
          paddingY="20"
          vertical="center"
        >
          <Row vertical="center" gap="8">
            <Text variant="body-default-l">sourceful.space </Text>
            <Column horizontal="start" vertical="center" fitWidth>
              <InlineCode textVariant="code-default-s">beta</InlineCode>
            </Column>
            <Line
              vert={true}
              height={2}
              background="neutral-alpha-medium"
              marginX="4"
            />
            {/* Command palette trigger */}
            <Kbd
              style={{ cursor: "pointer" }}
              onClick={() => setIsCmdOpenFromButton(true)}
              ref={(el) => {
                if (!el) return;
                const handleClickOutside = (event: MouseEvent) => {
                  if (!el.contains(event.target as Node)) {
                    setTimeout(() => {
                      setIsCmdOpenFromButton(false);
                    }, 700);
                  }
                };
                document.addEventListener("mousedown", handleClickOutside);
                return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
                };
              }}
            >
              <Text as="span" style={{ scale: "1" }}>
                <Text variant="code-default-xs">Ctrl+k</Text>
              </Text>
            </Kbd>
          </Row>
          {/* User menu and theme switcher */}
          <Row gap="12" vertical="center">
            <UserMenu
              name={user.name}
              subline={user.subline}
              tagProps={{ variant: "accent", label: "" }}
              avatarProps={{
                empty: false,
                src: user.pfp,
                statusIndicator: { color: statusIndicatorColor },
                onClick: () => {
                  setStatusIndicatorColor((prev) => {
                    const colors: Array<"green" | "yellow" | "red" | "gray"> = [
                      "green",
                      "yellow",
                      "red",
                      "gray",
                    ];
                    const next =
                      colors[(colors.indexOf(prev) + 1) % colors.length];
                    return next;
                  });
                },
                style: { cursor: "pointer" },
              }}
              loading={false}
              selected={false}
            />
            <Line vert={true} height={2} background="neutral-alpha-medium" />
            <ThemeSwitcher fillHeight />
          </Row>
        </Row>
      </Row>
      {/* Main content */}
      <Column
        overflow="hidden"
        as="main"
        maxWidth="l"
        position="relative"
        radius="xl"
        horizontal="center"
        border="neutral-alpha-weak"
        fillWidth
      >
        <Column
          fillWidth
          horizontal="center"
          gap="48"
          radius="xl"
          paddingTop="40"
          position="relative"
        >
          {/* Decorative backgrounds */}
          <Background
            mask={{ x: 5, y: 10 }}
            position="absolute"
            grid={{
              display: true,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{ x: 95, y: 2 }}
            gradient={{
              display: true,
              opacity: 40,
              height: 50,
              width: 50,
              tilt: -35,
              x: 100,
              y: 0,
              colorStart: "accent-solid-medium",
              colorEnd: "accent-solid-medium",
            }}
            grid={{
              display: true,
              opacity: 90,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
            position="absolute"
          />
          <Background
            mask={{ x: 100, y: 100 }}
            position="absolute"
            grid={{
              display: true,
              opacity: 90,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{ x: 100, y: 25 }}
            position="absolute"
            grid={{
              display: true,
              opacity: 90,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{ x: 100, y: 0, radius: 100 }}
            position="absolute"
            gradient={{
              display: true,
              tilt: -35,
              opacity: 100,
              height: 50,
              width: 35,
              x: 100,
              y: 60,
              colorStart: "accent-solid-medium",
              colorEnd: "static-transparent",
            }}
          />
          {/* Hero section */}
          <Column
            fillWidth
            horizontal="center"
            gap="32"
            padding="32"
            position="relative"
          >
            <InlineCode radius="xl" shadow="m" fit paddingX="16" paddingY="8">
              Backed by none 🥲 |
              <Text onBackground="brand-medium" marginLeft="8">
                <SmartLink
                  href={"https://github.com/divyanshudhruv/sourceful.space"}
                  target="_blank"
                >
                  Support us
                </SmartLink>
              </Text>
            </InlineCode>
            <Heading
              wrap="balance"
              variant="display-strong-xl"
              align="center"
              style={{ fontWeight: "bolder" }}
            >
              Where ideas
              <br />
              <a
                className={cedarville.className}
                style={{ color: "var(--neutral-strong)" }}
              >
                <u
                  style={{
                    textDecorationColor: "var(--accent-background-strong)",
                  }}
                >
                  emerges
                </u>
              </a>{" "}
              like grains.
            </Heading>
            <Text
              wrap="balance"
              variant="body-default-m"
              onBackground="neutral-weak"
              align="center"
            >
              Empowering developers and designers to explore, share, and
              contribute to open-source projects with AI-crafted
              briefs—streamlining projects, building community.
            </Text>
            <Button
              id="getStarted"
              label="Get started"
              href="#sourceful-section"
              variant="primary"
              size="l"
              arrowIcon
            />
            {/* AI review textarea */}
            <Column maxWidth={31} marginTop="8">
              <Textarea
                id="example-textarea"
                label="Describe your open-source startup idea"
                lines={7}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                spellCheck={false}
                maxLength={600}
                description={
                  <Row vertical="center">
                    <IconButton
                      icon="infoCircle"
                      size="s"
                      tooltip="Information"
                      tooltipPosition="top"
                      variant="ghost"
                      disabled={true}
                    />
                    <Text>Keep the text under 600 characters</Text>
                  </Row>
                }
                labelAsPlaceholder={false}
                resize="none"
              />
              <Button
                style={{
                  position: "absolute",
                  bottom: "45px",
                  right: "15px",
                  zIndex: "2",
                  transition: "0.3s !important",
                  paddingBlock: "22px",
                }}
                size="m"
                variant="primary"
                disabled={false}
                className={lexend.className}
                onClick={async () => {
                  const response = await handleSubmit(idea);
                  console.log(response);
                }}
              >
                {isLoading ? (
                  <Row
                    horizontal="center"
                    vertical="center"
                    fillHeight
                    fillWidth
                  >
                    <i
                      className="ri-loader-line"
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    <style jsx>{`
                      @keyframes spin {
                        0% {
                          transform: rotate(0deg);
                        }
                        100% {
                          transform: rotate(360deg);
                        }
                      }
                    `}</style>
                  </Row>
                ) : (
                  <Text variant="label-strong-s">Review by AI</Text>
                )}
              </Button>
              {/* AI review dialog */}
              <Dialog
                maxWidth={35}
                style={{ zIndex: 999999999 }}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="AI Review"
                description="Your idea has been reviewed by AI, and here are the suggestions."
              >
                <Column fillWidth gap="16" marginTop="12">
                  <Text style={{ lineHeight: "1.3em" }}> {response}</Text>
                </Column>
              </Dialog>
            </Column>
            {/* Showcase section */}
            <Column
              horizontal="center"
              paddingTop="32"
              paddingBottom="32"
              fillWidth
              gap="24"
            >
              <Line
                maxWidth={4}
                marginBottom="16"
                background="neutral-alpha-medium"
              />
            </Column>
            <Column horizontal="center" fillWidth gap="4">
              <Heading as="h1" variant="display-default-m">
                Showcase
              </Heading>
              <Text
                marginBottom="32"
                align="center"
                onBackground="neutral-weak"
              >
                Tiny open-source projects that are making a big impact
              </Text>
              {/* Compare image */}
              <CompareImage
                radius="xl"
                overflow="hidden"
                border="neutral-alpha-weak"
                leftContent={{ src: "/images/1.jpg", alt: "alt" }}
                rightContent={{ src: "/images/2.jpg", alt: "alt" }}
              />
            </Column>
          </Column>
          {/* Indie creators section */}
          <Column horizontal="center" fillWidth gap="24" id="sourceful-section">
            <AvatarGroup
              marginBottom="8"
              reverse
              size="m"
              limit={2}
              avatars={[
                { src: "/images/pfp.png" },
                { src: "" },
                { src: "" },
                { src: "" },
              ]}
            />
            <Heading
              marginBottom="12"
              as="h2"
              align="center"
              variant="heading-default-l"
            >
              Brought to you by indie creators
              <br /> unveiling ingenious ideas.
            </Heading>
          </Column>
          <Line maxWidth={4} background="neutral-alpha-medium" />
          {/* Projects grid */}
          <Column
            horizontal="center"
            fillWidth
            gap="4"
            paddingBottom="40"
            paddingTop="40"
          >
            {/* Decorative backgrounds */}
            <Background
              mask={{ x: 5, y: 10 }}
              position="absolute"
              grid={{
                display: true,
                opacity: 60,
                width: "0.25rem",
                color: "neutral-alpha-medium",
                height: "0.25rem",
              }}
            />
            <Background
              mask={{ x: 95, y: 2 }}
              grid={{
                display: true,
                opacity: 10,
                width: "0.25rem",
                color: "neutral-alpha-medium",
                height: "0.25rem",
              }}
              position="absolute"
            />
            <Fade
              fill
              position="absolute"
              base="page"
              bottom="0"
              to="top"
              bottomRadius="l"
              pattern={{ display: true, size: "8" }}
            />
            <Background
              mask={{ x: 100, y: 25 }}
              position="absolute"
              grid={{
                display: true,
                opacity: 90,
                width: "0.25rem",
                color: "neutral-alpha-medium",
                height: "0.25rem",
              }}
            />
            <Background
              mask={{ x: 100, y: 100, radius: 100 }}
              position="absolute"
            />
            <Background
              mask={{ x: 100, y: 100 }}
              position="absolute"
              grid={{
                display: true,
                opacity: 90,
                width: "0.25rem",
                color: "neutral-alpha-medium",
                height: "0.25rem",
              }}
            />
            {/* Search input */}
            <Column maxWidth="s" fillHeight marginBottom="40" paddingX="20">
              <Row gap="16" vertical="center">
                <Input
                  id="input-1"
                  label="Search for projects"
                  value={searchValue}
                  labelAsPlaceholder={true}
                  onChange={handleChange}
                  hasPrefix={<Icon name="search" size="xs" />}
                  hasSuffix={
                    searchValue.length > 0 ? (
                      <IconButton
                        variant="ghost"
                        icon="close"
                        size="s"
                        onClick={handleClear}
                        aria-label="Clear search"
                      />
                    ) : null
                  }
                />
                <Kbd label="Ctrl+k"></Kbd>
              </Row>
            </Column>
            {/* Project cards */}
            <Row maxWidth={65}>
              <RevealFx
                delay={0.2}
                translateY={0.5}
                horizontal="center"
                gap="64"
                wrap
                minHeight={32}
              >
                {(() => {
                  const filteredProjects = projectsData.filter((proj) =>
                    searchValue.trim() === ""
                      ? true
                      : (
                          (proj.title?.toLowerCase() ?? "") +
                          " " +
                          (proj.name?.toLowerCase() ?? "")
                        ).includes(searchValue.toLowerCase())
                  );
                  if (filteredProjects.length === 0) {
                    return (
                      <Text
                        variant="label-default-l"
                        onBackground="neutral-weak"
                        align="center"
                        style={{ width: "100%", height: "100%" }}
                      >
                        No projects found
                      </Text>
                    );
                  }
                  return filteredProjects.map((proj) => (
                    <SourcefulCard
                      key={proj.project_id}
                      id={proj.title}
                      avatarSrc={proj.pfp ?? ""}
                      name={proj.name ?? "User"}
                      imageSrc={proj.media_url || "/images/placeholder.jpg"}
                      imageAlt={proj.title}
                      title={proj.title}
                      description={proj.description}
                      likes={proj.likes ?? 0}
                      href={proj.website_link ?? ""}
                      open_for_funding={proj.open_for_funding ?? false}
                    />
                  ));
                })()}
              </RevealFx>
            </Row>
            {/* Load more button */}
            <Row paddingY="20" paddingTop="40">
              <Button variant="secondary" size="l" onClick={() => {}}>
                <Text variant="body-default-l">Load more </Text>
              </Button>
            </Row>
          </Column>
        </Column>
      </Column>
      {/* Footer */}
      <Row
        position="relative"
        as="footer"
        fillWidth
        paddingX="l"
        paddingTop="64"
      >
        <Column
          position="relative"
          textVariant="body-default-xs"
          onBackground="neutral-medium"
          horizontal="center"
          align="center"
          fillWidth
          gap="16"
        >
          <Logo wordmark={false} size="s" />
          <Text size="m">
            <Text onBackground="neutral-weak">2025 /</Text> Sourceful Space
          </Text>
          <SmartLink href="#">MIT License</SmartLink>
          <Column horizontal="center" gap="8">
            {" "}
            <Text onBackground="neutral-weak">
              <Text onBackground="neutral-weak">Built with </Text>
              <SmartLink href="https://once-ui.com" target="_blank">
                <Text>
                  <u>once-ui</u>
                </Text>
              </SmartLink>
            </Text>
            <Text onBackground="neutral-weak">
              <Text onBackground="neutral-weak">Powered by </Text>
              <SmartLink href="https://supabase.com" target="_blank">
                <Text>
                  <u>supabase</u>
                </Text>
              </SmartLink> and   <SmartLink href="https://ai.google.dev" target="_blank">
                <Text>
                  <u>gemini</u> 
                </Text>
              </SmartLink> AI
            </Text>
          </Column>
        </Column>
      </Row>
      {/* Signup Dialog */}
      <Dialog
        maxWidth={35}
        style={{ zIndex: 999999999 }}
        isOpen={isDialogOpenForSignUp}
        onClose={() => setIsDialogOpenForSignUp(false)}
        title="Signup"
        description="Sign up effortlessly with your Google account to join our vibrant community of developers and creators."
      >
        <Column fillWidth gap="16" marginTop="12">
          <Button
            variant="primary"
            size="m"
            onClick={() => {
              supabaseSignIn();
              addToast({
                variant: "success",
                message: "Redirecting to Google...",
              });
            }}
          >
            {isLoading ? (
              <Row horizontal="center" vertical="center" fillHeight fillWidth>
                <i
                  className="ri-loader-line"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                <style jsx>{`
                  @keyframes spin {
                    0% {
                      transform: rotate(0deg);
                    }
                    100% {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </Row>
            ) : (
              <Text variant="label-strong-s">SignUp</Text>
            )}
          </Button>
        </Column>
      </Dialog>
      {/* New project dialog */}
      <Dialog
        maxWidth={33}
        maxHeight={40}
        isOpen={isDialogOpenForNewProject}
        onClose={() => setIsDialogOpenForNewProject(false)}
        title={<Text variant="heading-default-xl">New Project</Text>}
        description={
          <Text variant="body-default-s" onBackground="neutral-weak">
            Create a new project to share with the community.
          </Text>
        }
        shadow="xs"
        footer={
          <Row horizontal="start" fillWidth paddingX="8">
            <Text
              variant="label-default-s"
              style={{ color: "#666", fontSize: "12px" }}
            >
              <i
                className="ri-information-line"
                style={{
                  fontSize: "14px",
                  color: "#666",
                  borderRadius: "100%",
                  marginRight: "4px",
                  marginTop: "2px",
                }}
              ></i>
              You can upload your project only once, no editing allowed.
            </Text>
          </Row>
        }
      >
        <Column
          fillWidth
          fillHeight
          horizontal="center"
          gap="12"
          marginBottom="2"
        >
          {/* Project title */}
          <Column fillWidth marginBottom="4">
            <Input
              id="project-title-input"
              spellCheck={false}
              label="Title"
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              error={false}
              radius="top"
              height="s"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
            {/* Project description */}
            <Textarea
              id="project-description-textarea"
              maxLength={200}
              spellCheck={false}
              label="Description (<200)"
              lines={2}
              resize="vertical"
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              radius="none"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
            {/* Project content */}
            <Textarea
              id="project-content-textarea"
              maxLength={500}
              description={
                <Row vertical="center">
                  <IconButton
                    icon="infoCircle"
                    size="s"
                    tooltip="😏"
                    tooltipPosition="top"
                    variant="ghost"
                    disabled={true}
                  />{" "}
                  <Text>Describe your project in detail. (optional)</Text>
                </Row>
              }
              label="Content (<500)"
              lines={4}
              spellCheck={false}
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              radius="bottom"
              value={project.content}
              onChange={(e) =>
                setProject({ ...project, content: e.target.value })
              }
            />
          </Column>
          {/* Project tags */}
          <Column fillWidth gap="8">
            <TagInput
              id="project-tags-input"
              value={project.tags}
              onChange={(tags) => setProject({ ...project, tags })}
              hasSuffix={
                <Row vertical="center" fit>
                  <Kbd>
                    Enter
                    {/* &nbsp;<i className="ri-corner-down-left-fill"></i> */}
                  </Kbd>
                </Row>
              }
              label="Tags"
            />
          </Column>
          {/* Website link */}
          <Row fillWidth>
            <Input
              id="project-website-link-input"
              label="Website Link"
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              error={false}
              height="s"
              spellCheck={false}
              hasPrefix={<Text variant="label-default-s">https://</Text>}
              value={project.websiteLink}
              onChange={(e) =>
                setProject({ ...project, websiteLink: e.target.value })
              }
            />
          </Row>
          {/* Media upload */}
          <Row fillWidth>
            <MediaUpload
              emptyState={
                <Column gap="8" fill center align="center">
                  <i className="ri-file-line"></i>
                  <Text variant="label-default-s">Add cover image</Text>
                </Column>
              }
              id="project-media-upload-input"
              height={20}
              compress={true}
              aspectRatio="16 / 9"
              quality={0}
              loading={false}
              onFileUpload={handleFileUpload}
            />
          </Row>
          {/* Media info */}
          <Row horizontal="start" fillWidth paddingX="8" marginBottom="2">
            <Column>
              <Text
                variant="label-default-s"
                style={{ color: "#666", fontSize: "12px" }}
              >
                Project Media (Aspect ratio: 4/3)
              </Text>
              <Text variant="label-default-s" style={{ color: "#666" }}></Text>
            </Column>
          </Row>
          {/* Built with */}
          <Input
            id="project-built-with-input"
            spellCheck={false}
            label="Built with"
            hasSuffix={<Kbd>Techs</Kbd>}
            labelAsPlaceholder={false}
            style={{ borderRadius: "0px !important" }}
            error={false}
            height="s"
            description={
              <Row vertical="center">
                <IconButton
                  icon="infoCircle"
                  size="s"
                  variant="ghost"
                  disabled={true}
                />
                <Text>Mention the tech stack used. (optional)</Text>
              </Row>
            }
            value={project.builtWith}
            onChange={(e) =>
              setProject({ ...project, builtWith: e.target.value })
            }
          />
          {/* Funding options */}
          <Column horizontal="start" fillWidth marginTop="32">
            <Flex marginBottom="20">
              <Switch
                isChecked={project.openForFunding}
                onToggle={() =>
                  setProject({
                    ...project,
                    openForFunding: !project.openForFunding,
                  })
                }
                reverse={false}
                label="Open for funding"
                description="Is this project open for funding?"
                iconButtonProps={{
                  onClick: () => {},
                  tooltip: "This is an optional feature",
                  tooltipPosition: "top",
                }}
              />
            </Flex>
            {/* Funding goal */}
            <NumberInput
              id="project-funding-amount-input"
              error={false}
              label="Funding goal ($)"
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              spellCheck={false}
              min={0}
              radius="top"
              value={project.fundingGoal}
              onChange={(value) =>
                setProject({ ...project, fundingGoal: value })
              }
            />
            {/* Looking for */}
            <NumberInput
              id="project-funding-amount-input-looking-for"
              error={false}
              label="Looking for ($)"
              labelAsPlaceholder={false}
              min={0}
              spellCheck={false}
              style={{ borderRadius: "0px !important" }}
              radius="none"
              value={project.lookingFor}
              onChange={(value) =>
                setProject({ ...project, lookingFor: value })
              }
            />
            {/* Funding pitch */}
            <Textarea
              id="project-funding-description-textarea"
              label="Funding pitch"
              lines={3}
              spellCheck={false}
              radius="bottom"
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              description={
                <Row vertical="center">
                  <IconButton
                    icon="infoCircle"
                    size="s"
                    variant="ghost"
                    disabled={true}
                  />
                  <Text>Describe your funding pitch in detail.</Text>
                </Row>
              }
              value={project.fundingPitch}
              onChange={(e) =>
                setProject({ ...project, fundingPitch: e.target.value })
              }
            />
          </Column>
          {/* Form actions */}
          <Row horizontal="end" fillWidth paddingBottom="20" gap="8">
            <Button variant="secondary" onClick={clearProject}>
              <Text variant="label-default-m">Clear</Text>
            </Button>
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={insertProjectToSupabase}
            >
              <Text>Publish</Text>
            </Button>
          </Row>
        </Column>
      </Dialog>
      {/* Command palette */}
      <Kbar items={kbarItems} isCmdOpen={isCmdOpenFromButton}>
        {""}
      </Kbar>
    </Column>
  );
}

// Empty CommandPalette for future extension
function CommandPalette() {
  return <></>;
}
