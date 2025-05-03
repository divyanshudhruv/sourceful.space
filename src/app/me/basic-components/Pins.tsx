import React from "react";
import {
  Row,
  Column,
  Text,
  Button,
  Tag,
  Grid,
  SmartImage,
} from "@/once-ui/components";
import Cards from "./Cards";

export default function Pins() {
  return (
    <>
      {" "}
      <Row
        height={24}
        border="neutral-strong"
        radius="l"
        horizontal="start"
        marginTop="20"
        style={{ maxWidth: "800px" }}
      >
        <Row fillHeight style={{ minWidth: "60%" }}>
          <SmartImage
            src="https://cdn.dribbble.com/userupload/17124761/file/original-d497b2359d86be010307b1340f18ac4b.png?resize=1024x768&vertical=center"
            alt="Image description"
            aspectRatio="5/4"
            height={3}
            radius="l"
            isLoading={false}
            objectFit="cover"
            unoptimized={true}
          />
        </Row>
        <Column padding="40" style={{ maxWidth: "40%" }}>
          <Row vertical="center" textVariant="body-default-xl">
            <Text style={{ fontSize: "32px", color: "#333" }}>HelloLink</Text>
            {true && (
              <Tag
                variant="neutral"
                size="s"
                label="Investment"
                marginLeft="2"
                padding="1"
                paddingTop="4"
                paddingBottom="4"
              />
            )}
          </Row>
          <Row marginTop="20">
            <Text
              variant="body-default-s"
              onBackground="neutral-weak"
              style={{ fontSize: "14px" }}
            >
              A platform that connects developers with startups looking for
              talent. Developers can create profiles, showcase their skills, and
              apply for projects that match their expertise.
            </Text>
          </Row>
          <Column
            paddingY="8"
            marginTop="20"
            gap="8"
            vertical="end"
            fillHeight
            textVariant="label-default-s"
            onBackground="neutral-weak"
            horizontal="space-between"
          >
            <Button
              variant="secondary"
              fillWidth
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
            >
              Details
            </Button>
            <Button
              variant="secondary"
              fillWidth
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
            >
              Invest
            </Button>
          </Column>
        </Column>
      </Row>
      <Column horizontal="center" style={{ maxWidth: "800px" }}>
        <Grid marginTop="40" columns={3} fillWidth={true} gap="20">
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
        </Grid>
        <Row />
        <Row marginTop="40" marginBottom="40">
          <Button variant="secondary" style={{ borderRadius: "5px" }} size="s">
            Load more
          </Button>
        </Row>
      </Column>
    </>
  );
}
