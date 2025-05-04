import React from "react";
import {
  Row,
  Column,
  Text,
  Button,
  Tag,
  SmartImage,
} from "@/once-ui/components";
import { Lexend } from "next/font/google";
const lexend = Lexend({ subsets: ["latin"], weight: "400" });
import "./TopPin.css"; // Import the CSS file for styles
export default function TopPin() {
  const imageSrc = "/l4.png";
  const imageAlt = "Image description";
  const title = "Sourceful";
  const tags = [{ label: "#1" }, { label: "feat" }];
  const description =
    "Sourceful is your community hub for open source. Discover projects, connect with others, invest, and build the future together with collaboration and innovation at its core.";
  const buttons = [
    { label: "Details", href: "#" },
    { label: "Github", href: "https://github.com/divyanshudhruv/hellolink" },
  ];

  return (
    <>
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
      >
        <Row
          fillHeight
          style={{ minWidth: "60%" }}
          className="responsive-image"
        >
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
        <Column padding="40" style={{ maxWidth: "40%" }}>
          <Row vertical="center" textVariant="body-default-xl">
            <Text style={{ fontSize: "32px", color: "#333" }}>{title}</Text>
            {tags.map((tag, index) => (
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
            paddingY="8"
            marginTop="20"
            gap="8"
            vertical="end"
            fillHeight
            textVariant="label-default-s"
            onBackground="neutral-weak"
            horizontal="space-between"
          >
            {buttons.map((button, index) => (
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
    </>
  );
}

export function App() {
  return <TopPin />;
}
