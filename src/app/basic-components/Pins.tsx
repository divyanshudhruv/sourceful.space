import React from "react";
import { Row, Column, Button,Text } from "@/once-ui/components";
import Cards from "./Cards";
import TopPin from "./TopPin";

export default function Pins() {
  return (
    <div id="pins">
      <TopPin></TopPin>
      <Column horizontal="center" style={{ maxWidth: "800px" }}>
        {/* <Grid marginTop="40" columns={3} fillWidth={true} gap="20">
          <Cards
            id="card1"
            investible={true}
            imageUrl="https://cdn.dribbble.com/userupload/17124761/file/original-d497b2359d86be010307b1340f18ac4b.png?resize=1024x768&vertical=center"
            heading="HelloLink"
            body="A platform that connects developers with startups looking for talent. Developers can create profiles, showcase their skills, and apply for projects that match their expertise."
          ></Cards>
          <Cards
            id="card1"
            investible={true}
            imageUrl="https://cdn.dribbble.com/userupload/17124761/file/original-d497b2359d86be010307b1340f18ac4b.png?resize=1024x768&vertical=center"
            heading="HelloLink"
            body="A platform that connects developers with startups looking for talent. Developers can create profiles, showcase their skills, and apply for projects that match their expertise."
          ></Cards>
          <Cards
            id="card1"
            investible={true}
            imageUrl="https://cdn.dribbble.com/userupload/17124761/file/original-d497b2359d86be010307b1340f18ac4b.png?resize=1024x768&vertical=center"
            heading="HelloLink"
            body="A platform that connects developers with startups looking for talent. Developers can create profiles, showcase their skills, and apply for projects that match their expertise."
          ></Cards>
        </Grid> */}
        <Row marginTop="40" marginBottom="40">
          <Button variant="secondary" style={{ borderRadius: "5px" }} size="s">
            <Text variant="body-default-s">Coming soon!</Text>
          </Button>
        </Row>
      </Column>
    </div>
  );
}
