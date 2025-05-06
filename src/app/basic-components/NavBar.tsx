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
} from "@/once-ui/components";
import { Lexend } from "next/font/google";
import { useEffect, useState } from "react";
const lexend = Lexend({ subsets: ["latin"], weight: "400" });
import "./NavBar.css";
import supabase from "services/supabase";

export default function NavBar() {
  const [username, setUsername] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [session, setSession] = useState(false);
  const [sessionID, setSessionID] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

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
            minWidth={2}
            maxWidth={2}
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
