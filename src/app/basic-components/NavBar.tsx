import {
  Button,
  Flex,
  MegaMenu,
  Option,
  Row,
  Text,
  Column,
  UserMenu,
  IconButton,
  Dialog,
  Input,
  Textarea,
  TagInput,
  Kbd,
  ToggleButton,
  Feedback,
  Chip,
  Switch,
  NumberInput,
} from "@/once-ui/components";
import { Lexend } from "next/font/google";
import { useEffect, useState } from "react";
const lexend = Lexend({ subsets: ["latin"], weight: "400" });
import "./NavBar.css";
import supabase from "services/supabase";
import { s } from "node_modules/framer-motion/dist/types.d-DDSxwf0n";
import { MediaUpload } from "@/once-ui/modules";

export default function NavBar() {
  const [username, setUsername] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [session, setSession] = useState(false);
  const [sessionID, setSessionID] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isOpenPrimary, setIsOpenPrimary] = useState(false);
  const [isOpenSecondary, setIsOpenSecondary] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      } else if (data.session) {
        setSession(true);
        setSessionID(data.session.user.id);
        const { user } = data.session;
        const displayName = user.user_metadata?.full_name || "Guest";
        const profilePicUrl = user.user_metadata?.avatar_url || "";
        const email = user.user_metadata?.email || "No email provided";
        console.log(user.user_metadata);
        setUsername(displayName);
        setProfilePicture(profilePicUrl);
        setEmail(email);
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    async function uploadUserInfo() {
      if (session && sessionID) {
        try {
          const { data, error }: { data: any; error: any } = await supabase
            .from("user_info")
            .upsert(
              {
                id: sessionID,
                email: email,
                username: username?.toLowerCase().trim().replace(/\s+/g, "_"),
                profile_picture: profilePicture,
                has_access: false,
                joined_at: new Date().toISOString(),
              },
              { onConflict: "id" }
            );

          if (error) {
            console.error("Error uploading user info:", error.message);
          } else {
            console.log("User info uploaded successfully:", data);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      }
    }

    uploadUserInfo();
  }, [session, sessionID, username, profilePicture]);

  useEffect(() => {
    async function uploadUserProfile() {
      if (session && sessionID) {
        try {
          const { data, error }: { data: any; error: any } = await supabase
            .from("user_profile")
            .upsert(
              {
                id: sessionID,
                email: email,
                profile_picture: profilePicture,
                joined_at: new Date().toISOString(),
                first_name: username?.split(" ")[0] || null,
                last_name: username?.split(" ")[1] || null,
                intro: null,
                interests: ["Design systems", "UI / UX"],
                website: null,
                github_username: null,
                online_status: false,
                total_pins: 0,
                featured_pin: null,
                featured_pin_options: null,
              },
              { onConflict: "id" }
            );

          if (error) {
            console.error("Error uploading user profile:", error.message);
          } else {
            console.log("User profile uploaded successfully:", data);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      }
    }

    uploadUserProfile();
  }, [session, sessionID, username, profilePicture, email]);

  async function logout_supabase() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      window.location.href = "/login";
    }
  }

  const toggleButtonsData = [
    { selected: true, theText: "AI" },
    { selected: false, theText: "BuildInPublic" },
    { selected: false, theText: "OpenSource" },
    { selected: false, theText: "Portfolio" },
    { selected: false, theText: "SaaS" },
    { selected: false, theText: "Concept" },
    { selected: false, theText: "Others" },
  ];

  const [toggleStates, setToggleStates] = useState(
    toggleButtonsData.map((data) => ({ ...data }))
  );

  const handleToggle = (index: number) => {
    setToggleStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, selected: !state.selected } : state
      )
    );
  };
  const [pinTitle, setPinTitle] = useState("");
  const [pinDescription, setPinDescription] = useState("");
  const [pinContent, setPinContent] = useState("");
  const [pinTags, setPinTags] = useState<string[]>([]);
  const [pinWebsiteLink, setPinWebsiteLink] = useState("");
  const [pinMedia, setPinMedia] = useState<File | null>(null);
  const [pinBuiltWith, setPinBuiltWith] = useState("");
  const [isOpenForFunding, setIsOpenForFunding] = useState(false);
  const [fundingGoal, setFundingGoal] = useState<number>(0);
  const [lookingForAmount, setLookingForAmount] = useState<number>(0);
  const [fundingDescription, setFundingDescription] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  function send_project_data_to_supabase() {
    console.log(pinDescription);
    console.log(pinTitle);
    console.log(pinContent);
    console.log(pinTags);
    console.log(pinWebsiteLink);
    console.log(pinMedia);
    console.log(pinBuiltWith);
    console.log(isOpenForFunding);
    console.log(fundingGoal);
    console.log(lookingForAmount);
    console.log(fundingDescription);
    console.log(selectedValues);
  }
  return (
    <Row
      borderBottom="neutral-medium"
      // borderLeft="neutral-medium"
      // borderRight="neutral-medium"
      fillWidth
      horizontal="center"
      borderWidth={2}
    >
      <Row
        content="center"
        vertical="center"
        horizontal="space-between"
        paddingX="m"
        style={{ maxWidth: "1220px", width: "100vw" }}
        paddingY="4"
        fillWidth
      >
        <Row
          style={{ minWidth: "172px", maxWidth: "172px" }}
          horizontal="start"
          vertical="center"
        >
          <Button
            variant="secondary"
            size="s"
            href="/"
            style={{ backgroundColor: "white" }}
          >
            <Text variant="body-default-s" className={lexend.className}>
              sourceful.space
            </Text>
          </Button>
          <Row>
            <Flex width={1}></Flex>
            <MegaNavBar />
          </Row>{" "}
        </Row>

        <Row vertical="center" horizontal="center">
          <UserMenu
            name={username || "Guest"}
            subline={username ? "Space User" : "Space Visitor"}
            avatarProps={{
              empty: false,
              statusIndicator: {
                color: "yellow",
              },
              src: profilePicture || "",
            }}
            loading={!username}
            selected={false}
            minWidth={4}
            maxWidth={4}
            style={{ scale: "0.85" }}
            className="usermenu"
            dropdown={
              <Column
                padding="0"
                className="usermenu-dropdown"
                paddingTop="4"
                paddingBottom="4"
              >
                {session ? (
                  <Column paddingX="8" paddingY="4">
                    <Option
                      value="Profile"
                      onClick={() =>
                        (window.location.href = `/profile/${sessionID}`)
                      }
                      label={
                        <Row horizontal="center" vertical="center" gap="8">
                          <IconButton variant="secondary">
                            <i
                              className="ri-settings-line"
                              style={{ fontSize: "14px", color: "#555" }}
                            ></i>
                          </IconButton>
                          <Text>Profile</Text>
                        </Row>
                      }
                    />
                    <Option
                      value="Profile"
                      onClick={() => setIsOpenPrimary(true)}
                      label={
                        <Row horizontal="center" vertical="center" gap="8">
                          <IconButton variant="secondary">
                            <i
                              className="ri-add-line"
                              style={{ fontSize: "14px", color: "#555" }}
                            ></i>
                          </IconButton>
                          <Text>Create</Text>
                        </Row>
                      }
                    />
                    <Option
                      value="Profile"
                      onClick={logout_supabase}
                      label={
                        <Row horizontal="center" vertical="center" gap="8">
                          <IconButton variant="secondary">
                            <i
                              className="ri-user-line"
                              style={{ fontSize: "14px", color: "#555" }}
                            ></i>
                          </IconButton>
                          <Text>Logout</Text>
                        </Row>
                      }
                    />
                  </Column>
                ) : (
                  <Row paddingX="8" paddingY="4">
                    <Option
                      onClick={() => (window.location.href = "/login")}
                      value="Login"
                      label={
                        <Row horizontal="center" vertical="center" gap="8">
                          <IconButton variant="secondary">
                            <i
                              className="ri-login-box-line"
                              style={{ fontSize: "14px", color: "#555" }}
                            ></i>
                          </IconButton>
                          <Text>Login</Text>
                        </Row>
                      }
                    />
                  </Row>
                )}
              </Column>
            }
          />
        </Row>
      </Row>

      <Dialog
        maxWidth={30}
        isOpen={isOpenPrimary} //isOpen
        onClose={() => setIsOpenPrimary(false)}
        title={<Text variant="heading-default-xl">New Pin</Text>}
        description={
          <Text variant="body-default-s" onBackground="neutral-weak">
            Create a new pin to share with the community.
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
        <Column fillWidth fillHeight horizontal="center" gap="12">
          <Column fillWidth>
            <Input
              id="pin-title-input"
              label="Title"
              value={pinTitle}
              onInput={(e) => setPinTitle(e.currentTarget.value)}
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              error={false}
              radius="top"
              height="s"
            />
            <Textarea
              id="pin-description-textarea"
              label="Description"
              lines={1}
              value={pinDescription}
              onInput={(e) => setPinDescription(e.currentTarget.value)}
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              radius="none"
            />
            <Textarea
              id="pin-content-textarea"
              description="Describe your pin in detail. (optional)"
              label="Content"
              lines={4}
              value={pinContent}
              onInput={(e) => setPinContent(e.currentTarget.value)}
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              radius="bottom"
            />
          </Column>

          <Column fillWidth gap="8">
            <TagInput
              id="pin-tags-input"
              value={pinTags}
              onChange={(tags) => setPinTags(tags)}
              hasSuffix={<Kbd>Enter</Kbd>}
              label="Tags"
            />
            <Row
              height={3}
              fillWidth
              gap="4"
              paddingX="2"
              style={{
                maxWidth: "100%",
                overflowY: "hidden",
                overflowX: "scroll",
              }}
            >
              {toggleStates.map((toggleState, index) => (
                <ToggleButton
                  key={index}
                  onClick={() => {
                    handleToggle(index);
                    const selectedText = toggleState.theText;
                    setSelectedValues((prevValues) =>
                      toggleState.selected
                        ? prevValues.filter((value) => value !== selectedText)
                        : [...prevValues, selectedText]
                    );
                  }}
                  selected={toggleState.selected}
                  size="m"
                  fillWidth={false}
                  justifyContent="center"
                  style={{
                    border: "1px solid #EFEEEB",
                    padding: "8px",
                  }}
                >
                  <Text variant="body-default-xs" style={{ color: "#555" }}>
                    <Text variant="label-default-xs" style={{ color: "#777" }}>
                      #
                    </Text>
                    {toggleState.theText}
                  </Text>
                </ToggleButton>
              ))}
            </Row>
          </Column>
          <Row fillWidth>
            <Input
              id="pin-website-link-input"
              label="Website Link"
              value={pinWebsiteLink}
              onInput={(e) => setPinWebsiteLink(e.currentTarget.value)}
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              error={false}
              height="s"
              hasPrefix={<Text variant="label-default-s">https://</Text>}
            />
          </Row>
          <Row fillWidth>
            <MediaUpload
              id="pin-media-upload-input"
              height={20}
              compress={true}
              aspectRatio="16 / 9"
              quality={0}
              loading={false}
              initialPreviewImage=""
              onChange={(event) => {
                const file =
                  (event.target as HTMLInputElement).files?.[0] || null;
                setPinMedia(file);
              }}
            />
          </Row>

          <Row horizontal="start" fillWidth paddingX="8">
            <Column>
              <Text
                variant="label-default-s"
                style={{ color: "#333", fontSize: "12px" }}
              >
                Project Media
              </Text>
              <Text variant="label-default-s" style={{ color: "#666" }}></Text>
            </Column>
          </Row>

          <Input
            id="pin-built-with-input"
            label="Built with"
            hasSuffix={<Kbd>Techs</Kbd>}
            value={pinBuiltWith}
            onInput={(e) => setPinBuiltWith(e.currentTarget.value)}
            labelAsPlaceholder={false}
            style={{ borderRadius: "0px !important" }}
            error={false}
            height="s"
            description={"Mention the tech stack used. (required)"}
          ></Input>
          <Column horizontal="start" fillWidth marginTop="32">
            <Flex marginBottom="20">
              <Switch
                reverse={false}
                label="Open for funding"
                description="Is this project open for funding?"
                isChecked={isOpenForFunding}
                onToggle={() => setIsOpenForFunding(!isOpenForFunding)}
                iconButtonProps={{
                  onClick: () => {},
                  tooltip: "This is an optional feature",
                  tooltipPosition: "top",
                }}
              />
            </Flex>

            <NumberInput
              id="pin-funding-amount-input"
              error={false}
              label="Funding goal ($)"
              value={fundingGoal}
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              onChange={(value) => setFundingGoal(value)}
              radius="top"
            />
            <NumberInput
              id="pin-funding-amount-input-looking-for"
              error={false}
              label="Looking for ($)"
              value={lookingForAmount}
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              onChange={(value) => setLookingForAmount(value)}
              radius="none"
            />

            <Textarea
              id="pin-funding-description-textarea"
              label="Funding pitch"
              lines={3}
              value={fundingDescription}
              onInput={(e) => setFundingDescription(e.currentTarget.value)}
              radius="bottom"
              labelAsPlaceholder={false}
              style={{ borderRadius: "0px !important" }}
              description="Describe your funding pitch and requirements in detail."
            />
          </Column>
          <Row horizontal="end" fillWidth paddingBottom="20">
            <Button
              variant="primary"
              onClick={() => send_project_data_to_supabase()}
            >
              <Text>Create</Text>
            </Button>
          </Row>
        </Column>
      </Dialog>
    </Row>
  );
}

function MegaNavBar() {
  return (
    <MegaMenu
      className="megamenu"
      style={{ scale: "1" }}
      menuGroups={[
        {
          label: "Home",
          suffixIcon: "check",
          href: "/",
        },
        {
          label: "Pins",
          suffixIcon: "chevron-down",
          href: "#pins",
        },
        {
          label: "Community",
          suffixIcon: "chevron-down",
          // href: "https://github.com/divyanshudhruv/sourceful.space",
          href: "#",
        },
      ]}
    />
  );
}
