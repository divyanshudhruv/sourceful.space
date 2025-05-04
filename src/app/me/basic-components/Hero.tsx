import { Column, Flex, Row, Text } from "@/once-ui/components";
import { Lexend } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
const lexend = Lexend({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "400" });

import ToggleButtons from "./ToggleButtons";
export default function Hero() {
  return (
    <>
      {" "}
      <Column
        fillWidth
        style={{ height: "fit-content" }}
        paddingX="xl"
        horizontal="center"
      >
        <Flex paddingX="xl" direction="column" paddingY="s">
          <Flex fillWidth style={{ height: "60px" }}></Flex>
          <Text
            variant="heading-strong-xl"
            className={lexend.className}
            style={{ fontSize: "35px", lineHeight: "1.2em", color: "#333" }}
            align="center"
          >
            AI powered ⚡ project briefs for 👀 developers 
          </Text>
            <Text
            variant="body-default-s"
            onBackground="neutral-medium"
            align="center"
            className={spaceGrotesk.className}
            style={{ marginTop: "15px" }}
            >
            Empowering developers with<b> AI-crafted </b> briefs for seamless open-source
            <b> innovation </b>, and <b>collaboration</b>.
            </Text>
          <Row
            horizontal="center"
            vertical="center"
            marginTop="56"
            marginBottom="20"
            wrap
            gap="8"
            style={{ maxWidth: "800px" }}
          >
            <ToggleButtons />
          </Row>
        </Flex>
      </Column>
    </>
  );
}
