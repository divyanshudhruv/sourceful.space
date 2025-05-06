import React from "react";
import {
  Row,
  Column,
  Text,
  Button,
  Tag,
  SmartImage,
} from "@/once-ui/components";
import "./TopPin.css"; // Import the CSS file for styles
export default function Pin() {
  const imageSrc = "/l4.png";
  const imageAlt = "Image description";
  const title = "Neartha Antivirus";
  const tags = [{ label: "#2" }];
  const description =
    "Sourceful is your community hub for open source. Discover projects, connect with others, invest, and build the future together with collaboration and innovation at its core.";
  const buttons = [{ label: "Details", href: "#" }];

  return (
    <PinCard
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      title={title}
      tags={tags}
      description={description}
      buttons={buttons}
    />
  );
}

export function App() {
  return <Pin />;
}

function PinCard({
  imageSrc,
  imageAlt,
  title,
  tags,
  description,
  buttons,
}: any) {
  return (
    <Row
      border="neutral-strong"
      radius="l"
      horizontal="start"
      marginTop="20"
      style={{
        maxWidth: "800px",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      className="responsive-row"
      cursor="pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f8f8f8";
        e.currentTarget.style.borderColor = "#bbb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.borderColor = "";
      }}
      height={24}
    >
      <Row fillHeight style={{ minWidth: "60%" }} className="responsive-image">
        <SmartImage
          src={imageSrc}
          alt={imageAlt}
          aspectRatio="5/4"
          height={3}
          radius="l"
          isLoading={false}
          objectFit="cover"
          unoptimized={true}
        />
      </Row>
      <Column
        padding="40"
        style={{ maxWidth: "40%" }}
        className="responsive-column"
      >
        <Row
          vertical="center"
          textVariant="body-default-xl"
          height={6}
          width={16}
          gap="2"
        >
          <Text
            style={{
              fontSize: "32px",
              color: "#333",
              display: "inline",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            {title}
          </Text>
          {tags.map((tag: any, index: number) => (
            <Tag
              key={index}
              variant="neutral"
              size="l"
              label={tag.label}
              marginLeft="4"
            ></Tag>
          ))}
        </Row>
        <Row marginTop="20">
          <Text
            variant="body-default-s"
            onBackground="neutral-weak"
            style={{ fontSize: "14px" }}
          >
            {description}
          </Text>
        </Row>
        <Column
          paddingY="0"
          marginTop="0"
          gap="8"
          vertical="end"
          fillHeight
          textVariant="label-default-s"
          onBackground="neutral-weak"
          horizontal="space-between"
        >
          <Row gap="4" horizontal="center" vertical="center">
            <Button
              variant="secondary"
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
              fillWidth
            >
              <Text
                style={{ fontSize: "13px !important" }}
                variant="label-default-s"
                onBackground="neutral-strong"
              >
                Upvote
              </Text>{" "}
            </Button>
            <Button
              fillWidth
              variant="secondary"
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
            >
              <Text
                style={{ fontSize: "13px !important" }}
                variant="label-default-s"
                onBackground="neutral-strong"
              >
                Downvote
              </Text>{" "}
            </Button>
          </Row>
          {buttons.map((button: any, index: number) => (
            <Button
              key={index}
              variant="secondary"
              fillWidth
              radius="none"
              style={{ borderRadius: "8px", color: "#333" }}
              href={button.href}
            >
              <Text
                style={{ fontSize: "13px !important" }}
                variant="label-default-s"
                onBackground="neutral-strong"
              >
                {button.label}
              </Text>
            </Button>
          ))}
        </Column>
      </Column>
    </Row>
  );
}
