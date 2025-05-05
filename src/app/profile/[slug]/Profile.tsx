import { Column, Flex, Row, Text } from "@/once-ui/components";
import { Lexend } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
const lexend = Lexend({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "400" });
import ProfileCard from "./ProfileCard";
import "./Profile.css";
export default function Profile() {
  return (
    <>
      <Column
        fillWidth
        style={{ height: "fit-content" }}
        paddingX="xl"
        horizontal="center"
      >
        <Flex paddingX="xl" direction="column" paddingY="s" horizontal="center">
          <Flex fillWidth style={{ height: "60px" }} className="responsive-row"></Flex>
          <Text
            variant="heading-strong-xl"
            className={`${lexend.className} responsive-text`}
            style={{ fontSize: "35px", lineHeight: "1.2em", color: "#333" }}
            align="center"
          >
            Manage your 👀 profile 🚀 space here
          </Text>
          <Text
            variant="body-default-s"
            onBackground="neutral-medium"
            align="center"
            className={`${spaceGrotesk.className} responsive-text-2`}
            style={{ marginTop: "15px", maxWidth: "700px" }}
          >
            Update or create your<b> profile </b> to showcase your unique
            identity, preferences, and achievements to highlight your skills,
            experiences, contributions and expertise.
          </Text>

          <ProfileCard></ProfileCard>
        </Flex>
      </Column>
    </>
  );
}
