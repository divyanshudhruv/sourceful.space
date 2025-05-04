import React from "react";
import { Row, Column, Text, Tag, Flex,SmartImage,IconButton } from "@/once-ui/components";
export default function Cards({
    id,
    imageUrl,
    heading,
    body,
    investible = false,
  }: {
    id: string;
    imageUrl: string;
    heading: string;
    body: string;
    investible?: boolean;
  }) {
    return (
      <Column
        key={id}
        maxWidth={18}
        radius="l-4"
        direction="column"
        maxHeight={27}
        border="neutral-strong"
        style={{
          transition: "background-color 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "#f1f1f1";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
        }}
      >
        <Column>
          <SmartImage
            sizes="640px"
            fillWidth={true}
            aspectRatio="4 / 3"
            radius="l"
            src={imageUrl}
            unoptimized={true}
          ></SmartImage>
        </Column>
        <Column fillWidth={true} paddingX="20" paddingY="24" gap="8">
          <Text variant="body-default-xl">
            <Row vertical="center">
              {heading}{" "}
              {investible && (
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
          </Text>
          <Text onBackground="neutral-weak" variant="body-default-s">
            {body}
          </Text>
        </Column>
        <Flex background="neutral-alpha-medium" />
        <Flex
          paddingX="20"
          paddingY="2"
          style={{ marginTop: "-15px", paddingBottom: "10px" }}
          gap="8"
          vertical="center"
          textVariant="label-default-s"
          onBackground="neutral-weak"
          horizontal="space-between"
        >
          <Row gap="4">
            <IconButton
              size="l"
              tooltip="Upvote"
              tooltipPosition="top"
              variant="secondary"
              disabled={false}
              style={{ backgroundColor: "#F9F8F5" }}
            >
              <i
                className="ri-arrow-up-line"
                style={{ fontSize: "17px", color: "#333" }}
              ></i>
            </IconButton>
            <IconButton
              size="l"
              tooltip="Downvote"
              tooltipPosition="top"
              variant="secondary"
              disabled={false}
              style={{ backgroundColor: "#F9F8F5" }}
            >
              <i
                className="ri-arrow-down-line"
                style={{ fontSize: "17px", color: "#333" }}
              ></i>
            </IconButton>
          </Row>
          <Row></Row>
        </Flex>
      </Column>
    );
  }
  