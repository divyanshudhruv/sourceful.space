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

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(!!session);
      setSessionID(session?.user?.id || null);
    };

    checkSession();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        setUsername("Guest");
        setProfilePicture(null);
        return;
      }

      const { data, error } = await supabase
        .from("user_info")
        .select("username, profile_picture")
        .eq("id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }

      setUsername(data?.username || null);
      setProfilePicture(data?.profile_picture || null);
    };

    fetchUserInfo();
  }, []);

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
