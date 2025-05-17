"use client";

import React, { useState, useEffect } from "react";

import { Lexend } from "next/font/google";
import "./../once-ui/styles/background.scss";
import { Playwrite_DK_Loopet } from "next/font/google";
const lexend = Lexend({ subsets: ["latin"] });
const cedarville = Playwrite_DK_Loopet({
  weight: "400",
});

import {
  Heading,
  Text,
  Button,
  Icon,
  InlineCode,
  Logo,
  Input,
  Avatar,
  AvatarGroup,
  Textarea,
  PasswordInput,
  SegmentedControl,
  SmartLink,
  Dialog,
  Feedback,
  SmartImage,
  Line,
  LogoCloud,
  Background,
  Select,
  useToast,
  Card,
  Fade,
  StatusIndicator,
  DateRangePicker,
  type DateRange,
  TiltFx,
  HoloFx,
  IconButton,
  TagInput,
  Switch,
  Column,
  Row,
  StyleOverlay,
  CompareImage,
  ThemeSwitcher,
  UserMenu,
  Flex,
  Kbar,
  Kbd,
} from "@/once-ui/components";
import { CodeBlock, MediaUpload } from "@/once-ui/modules";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
import { RiArrowRightUpFill, RiArrowRightUpLine } from "react-icons/ri";
import Link from "next/link";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { supabase } from "./utils/supabase/client";
import { SourcefulCard } from "./sourceful-ui/SourcefulCard";
export default function Home() {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isDialogOpenForSignUp, setIsDialogOpenForSignUp] = useState(false);
  const [isCmdOpenFromButton, setIsCmdOpenFromButton] = useState(false);
  const { addToast } = useToast();

  const [user, setUser] = useState({
    name: "User",
    pfp: "",
    subline: "Space User",
  });

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

    // Cleanup the event listener
    return () => {
      window.removeEventListener("log-out", handleLogOut);
    };
  }, []);

  useEffect(() => {
    const handleOpenDialog = () => {
      setIsDialogOpenForSignUp(true);
    };

    window.addEventListener("open-signup-dialog", handleOpenDialog);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("open-signup-dialog", handleOpenDialog);
    };
  }, []); // Open signup dialog when a custom event is dispatched

  async function supabaseSignIn() {
    // Sign in with Google using Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }
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
      name: "Submit Idea",
      section: "Navigation",
      shortcut: ["I"],
      keywords: "submit idea startup",
      href: "/submit",
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
      keywords: "logout signout delete sign out",
      href: "javascript:window.dispatchEvent(new CustomEvent('log-out'))",
      icon: "key",
    },
    {
      id: "support",
      name: "Support Us",
      section: "Community",
      shortcut: ["U"],
      keywords: "support donate help",
      href: "/support",
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
      href: "https://linkedin.com",
      icon: "linkedin",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSubmit = async (prompt: string) => {
    if (!prompt) {
      return;
    }
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

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center">
      <ScrollToTop>
        <IconButton variant="secondary" icon="chevronUp" />
      </ScrollToTop>
      <Fade
        zIndex={3}
        pattern={{
          display: true,
          size: "2",
        }}
        position="fixed"
        top="0"
        left="0"
        to="bottom"
        height={5}
        fillWidth
        blur={0.25}
      />
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
          <Row vertical="center" gap="12">
            <Text variant="body-default-l">sourceful.space</Text>
            <Line
              vert={true}
              height={2}
              background="neutral-alpha-medium"
            ></Line>
            <Kbd
              style={{
                cursor: "pointer",
              }}
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
              <Text as="span" style={{ scale: "0.85" }}>
                <Text variant="code-default-xs">ctrl+k</Text>
              </Text>
            </Kbd>
          </Row>

          <Row gap="12" hide="s" vertical="center">
            <UserMenu
              name={user.name}
              subline={user.subline}
              tagProps={{
                variant: "accent",
                label: "",
              }}
              avatarProps={{
                empty: false,
                src: user.pfp,
                statusIndicator: {
                  color: "gray",
                },
              }}
              loading={false}
              selected={false}
            />{" "}
            <Line
              vert={true}
              height={2}
              background="neutral-alpha-medium"
            ></Line>
            <ThemeSwitcher fillHeight />
          </Row>
        </Row>
      </Row>
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
          <Background
            mask={{
              x: 5,
              y: 10,
            }}
            position="absolute"
            grid={{
              display: true,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{
              x: 95,
              y: 2,
            }}
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
          {/* bottom */}
          <Background
            mask={{
              x: 100,
              y: 100,
            }}
            position="absolute"
            grid={{
              display: true,
              opacity: 90,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />

          {/* bottom over */}
          <Background
            mask={{
              x: 100,
              y: 25,
            }}
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
            mask={{
              x: 100,
              y: 0,
              radius: 100,
            }}
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
                <SmartLink href={"#"}>Support us</SmartLink>
              </Text>
            </InlineCode>
            <Heading
              wrap="balance"
              variant="display-strong-xl"
              align="center"
              style={{
                fontWeight: "bolder",
              }}
            >
              Where ideas
              <br />
              <a
                className={cedarville.className}
                style={{
                  color: "var(--neutral-strong)",
                }}
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
              Empowering developers with AI-crafted briefs to streamline
              workflows, foster community engagement, and drive impactful
              solutions in the tech ecosystem.
            </Text>
            <Button
              id="getStarted"
              label="Get started"
              href="#sourceful-section"
              variant="primary"
              size="l"
              arrowIcon
            />
            <Column maxWidth={31} marginTop="8">
              <Textarea
                id="example-textarea"
                label="Submit your open-source startup idea"
                lines={7}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                spellCheck={false}
                maxLength={600}
                description={
                  <>
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
                  </>
                  // meul
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
                      style={{
                        animation: "spin 1s linear infinite",
                      }}
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
              <Dialog
                maxWidth={35}
                style={{ zIndex: 999999999 }}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="AI Review"
                description="Your idea has been reviewed by AI, and here are the suggestions."
                // footer={
                //   <Row vertical="center" fillWidth>
                //     <IconButton
                //       icon="infoCircle"
                //       size="s"
                //       tooltip="Information"
                //       tooltipPosition="top"
                //       variant="ghost"
                //       disabled={true}
                //     />{" "}
                //     <Flex height="4"/>
                //     <Text variant="label-default-s">
                //       &nbsp;This is a suggestion from AI, you can choose to ignore it.
                //     </Text>
                //   </Row>
                // }
              >
                <Column fillWidth gap="16" marginTop="12">
                  <Text style={{ lineHeight: "1.3em" }}> {response}</Text>
                </Column>
              </Dialog>
            </Column>

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

              {/* COMPARE IMAGE */}
              <CompareImage
                radius="xl"
                overflow="hidden"
                border="neutral-alpha-weak"
                leftContent={{ src: "/images/1.jpg", alt: "alt" }}
                rightContent={{ src: "/images/2.jpg", alt: "alt" }}
              />
            </Column>
          </Column>
          <Column horizontal="center" fillWidth gap="24" id="sourceful-section">
            <AvatarGroup
              marginBottom="8"
              reverse
              size="m"
              limit={2}
              avatars={[
                {
                  src: "/images/pfp.png",
                },
                {
                  src: "",
                },
                {
                  src: "",
                },
                {
                  src: "",
                },
              ]}
            />

            <Heading
              marginBottom="12"
              as="h2"
              align="center"
              variant="heading-default-l"
            >
              Brought to you by indie creators
              <br /> crafting stellar ideas.
            </Heading>
          </Column>
          <Line maxWidth={4} background="neutral-alpha-medium" />
          <Column
            horizontal="center"
            fillWidth
            gap="4"
            paddingBottom="40"
            paddingTop="40"
          >
            <Background
              mask={{
                x: 5,
                y: 10,
              }}
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
              mask={{
                x: 95,
                y: 2,
              }}
              grid={{
                display: true,
                opacity: 10,
                width: "0.25rem",
                color: "neutral-alpha-medium",
                height: "0.25rem",
              }}
              position="absolute"
            />
            {/* bottom over */}
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
              mask={{
                x: 100,
                y: 25,
              }}
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
              mask={{
                x: 100,
                y: 100,
                radius: 100,
              }}
              position="absolute"
              // gradient={{
              //   display: true,
              //   tilt: -35,
              //   opacity: 80,
              //   height: 40,
              //   width: 25,
              //   x: 90,
              //   y: 100,
              //   colorStart: "accent-solid-medium",
              //   colorEnd: "static-transparent",
              // }}
            />
            <Background
              mask={{
                x: 100,
                y: 100,
              }}
              position="absolute"
              grid={{
                display: true,
                opacity: 90,
                width: "0.25rem",
                color: "neutral-alpha-medium",
                height: "0.25rem",
              }}
            />
            <Column maxWidth="s" fillHeight marginBottom="40">
              <Input
                id="input-1"
                label="Search for pins"
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
            </Column>
            {/* SOURCEFUL CARD */}
            <Row maxWidth={65} horizontal="center" gap="64" wrap>
              <SourcefulCard
                avatarSrc={user.pfp}
                name={user.name}
                imageSrc="/images/1.jpg"
                imageAlt="alt"
                title="Sourceful Space"
                description="A platform for developers to share and discover open-source projects."
                likes={64}
              />
            </Row>
            {/* SOURCEFUL CARD */}
            <Row paddingY="20" paddingTop="40">
              <Button variant="secondary" size="l">
                <Text variant="body-default-l">Load more</Text>
              </Button>
            </Row>
          </Column>
          {/*ending of the main column */}
        </Column>
      </Column>
      <Row
        position="relative"
        as="footer"
        fillWidth
        paddingX="l"
        paddingTop="64"
      >
        {/* <Background
          mask={{
            x: 50,
            y: 0,
          }}
          position="absolute"
          grid={{
            opacity:30,
            display: true,
            width: "0.25rem",
            color: "brand-alpha-strong",
            height: "0.25rem",
          }}
        /> */}
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
        </Column>
      </Row>
      {/* <CommandPalette /> */}
      <Kbar items={kbarItems} isCmdOpen={isCmdOpenFromButton}>
        {""}
      </Kbar>

      <Dialog
        maxWidth={35}
        style={{ zIndex: 999999999 }}
        isOpen={isDialogOpenForSignUp}
        onClose={() => setIsDialogOpenForSignUp(false)}
        title="Signup"
        description="Sign up effortlessly with your Google account to join our vibrant community of developers and creators."
      >
        <Column fillWidth gap="16" marginTop="12">
          <Button variant="primary" size="m" onClick={supabaseSignIn}>
            SignUp
          </Button>
        </Column>
      </Dialog>
    </Column>
  );
}

function CommandPalette() {
  return <></>;
}
