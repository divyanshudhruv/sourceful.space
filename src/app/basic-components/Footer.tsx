import { Row, Text } from "@/once-ui/components";

import { Space_Grotesk } from "next/font/google";
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });

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
          © 2025 sourceful.space / <span style={{color:"#222"}}>License? idk</span>
        </Text>
      </Row>
    </>
  );
}
