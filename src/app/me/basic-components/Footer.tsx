import { Column, Flex, Row, Text } from "@/once-ui/components";
import { Lexend } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Poppins } from "next/font/google";
const lexend = Lexend({ subsets: ["latin"], weight: "400" });
const lexendBold = Lexend({ subsets: ["latin"], weight: "700" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });
const poppins = Poppins({ subsets: ["latin"], weight: "700" });

export default function Footer() {
  return (
    <>
      {" "}
      <Row
        fillWidth
        style={{ height: "fit-content" }}
        paddingX="xl"
        horizontal="center"
        gap="4"
        paddingY="16"
      >
        <Text
          variant="body-default-xs"
          onBackground="neutral-weak"
          className={spaceGrotesk.className}
        >
          © 2025, sourceful.space / <span style={{color:"#222"}}>MIT License</span>
        </Text>
      </Row>
    </>
  );
}
