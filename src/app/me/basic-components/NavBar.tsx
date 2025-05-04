import {
  Button,
  Flex,
  Line,
  MegaMenu,
  Option,
  Row,
  Text,
  Column,
  UserMenu,
  IconButton,
} from "@/once-ui/components";
import { Lexend } from "next/font/google";
const lexend = Lexend({ subsets: ["latin"], weight: "400" });

export default function NavBar() {
  return (
    <Row
      borderBottom="neutral-medium"
      borderWidth={2}
      fillWidth
      content="center"
      vertical="center"
      horizontal="space-between"
      paddingX="m"
      paddingY="4"
    >
      <Row
        style={{ minWidth: "172px", maxWidth: "172px" }}
        horizontal="start"
        vertical="center"
      >
        <Button
          variant="secondary"
          size="s"
          href="#"
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
          style={{ scale: "0.85" }}
          name="Divyanshu Dhruv"
          subline="Developer"
          avatarProps={{
            empty: true,
            statusIndicator: {
              color: "gray",
            },
          }}
          loading={false}
          selected={false}
          minWidth={2}
          maxWidth={2}
          dropdown={
            <Column fillWidth minWidth={11} padding="4">
              <Row paddingX="8" paddingY="4">
                <Option
                  value="Profile"
                  label={
                    <Row horizontal="center" vertical="center" gap="8">
                      <IconButton variant="secondary">
                        {" "}
                        <i
                          className="ri-user-line"
                          style={{ fontSize: "14px", color: "#555" }}
                        ></i>
                      </IconButton>
                      Profile
                    </Row>
                  }
                />
              </Row>

              <Row paddingX="8" paddingY="4">
                <Option
                  value="Subscription"
                  label={
                    <Row horizontal="center" vertical="center" gap="8">
                      <IconButton variant="secondary">
                        {" "}
                        <i
                          className="ri-add-line"
                          style={{ fontSize: "17px", color: "#555" }}
                        ></i>
                      </IconButton>
                      Create
                    </Row>
                  }
                />
              </Row>
              <Line marginY="4" />
              <Row paddingX="8" paddingY="4">
                <Option
                  value="Log out"
                  label={
                    <Row horizontal="center" vertical="center" gap="8">
                      <IconButton variant="secondary">
                        {" "}
                        <i
                          className="ri-door-line"
                          style={{ fontSize: "17px", color: "#555" }}
                        ></i>
                      </IconButton>
                      Logout
                    </Row>
                  }
                />
              </Row>
            </Column>
          }
        />
      </Row>
    </Row>
  );
}

function MegaNavBar() {
  return (
    <MegaMenu
      style={{ scale: "1" }}
      menuGroups={[
        {
          label: "Home",
          suffixIcon: "check",
        },
        {
          label: "Pins",
          suffixIcon: "chevron-down",
          href: "#pins",
        },
        {
          label: "Community",
          suffixIcon: "chevron-down",
          href: "https://github.com/divyanshudhruv/sourceful.space",
        },
      ]}
    />
  );
}
