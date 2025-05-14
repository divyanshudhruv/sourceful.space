// Example page: delete the content or rework the blocks
"use client";

import type React from "react";
import { useState } from "react";
const lexend = Lexend({ subsets: ["latin"] });
import {
  Heading,
  Text,
  Button,
  Icon,
  InlineCode,
  Logo,
  Input,
  Avatar,
  AvatarGroup,
  Textarea,
  PasswordInput,
  SegmentedControl,
  SmartLink,
  Dialog,
  Feedback,
  SmartImage,
  Line,
  LogoCloud,
  Background,
  Select,
  useToast,
  Card,
  Fade,
  StatusIndicator,
  DateRangePicker,
  type DateRange,
  TiltFx,
  HoloFx,
  IconButton,
  TagInput,
  Switch,
  Column,
  Row,
  StyleOverlay,
  CompareImage,
  ThemeSwitcher,
  UserMenu,
} from "@/once-ui/components";
import { CodeBlock, MediaUpload } from "@/once-ui/modules";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
import { RiArrowRightUpFill, RiArrowRightUpLine } from "react-icons/ri";
import { Lexend } from "next/font/google";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (prompt: string) => {
    if (!prompt) {
      return;
    }
    setIsLoading(true);
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    setIsLoading(false);
    if (!response.ok) {
      console.error("Error:", data);
      return;
    }
    setTimeout(() => {
      alert(data.generatedText);
    }, 1000);

    console.log("Usage Metadata:", data.usageMetadata);
  };

  return (
    <Column fillWidth paddingY="80" paddingX="s" horizontal="center" flex={1}>
      <ScrollToTop>
        <IconButton variant="secondary" icon="chevronUp" />
      </ScrollToTop>
      <Fade
        zIndex={3}
        pattern={{
          display: true,
          size: "2",
        }}
        position="fixed"
        top="0"
        left="0"
        to="bottom"
        height={5}
        fillWidth
        blur={0.25}
      />
      <Row position="fixed" top="0" fillWidth horizontal="center" zIndex={3}>
        <Row
          data-border="rounded"
          horizontal="space-between"
          maxWidth="l"
          paddingRight="32"
          paddingLeft="32"
          paddingY="20"
          vertical="center"
        >
          <Text variant="body-default-l">sourceful.space</Text>
          <Row gap="12" hide="s" vertical="center">
            <UserMenu
              name="Divyanshu Dhruv"
              subline="Space User"
              tagProps={{
                variant: "accent",
                label: "",
              }}
              avatarProps={{
                empty: false,
                src: "/images/pfp.png",
                statusIndicator: {
                  color: "gray",
                },
              }}
              loading={false}
              selected={false}
            />{" "}
            <Line vert={true} height={2}></Line>
            <ThemeSwitcher fillHeight />
          </Row>
        </Row>
      </Row>
      <Column
        overflow="hidden"
        as="main"
        maxWidth="l"
        position="relative"
        radius="xl"
        horizontal="center"
        border="neutral-alpha-weak"
        fillWidth
      >
        <Column
          fillWidth
          horizontal="center"
          gap="48"
          radius="xl"
          paddingTop="40"
          position="relative"
        >
          <Background
            mask={{
              x: 0,
              y: 10,
            }}
            position="absolute"
            grid={{
              display: true,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{
              x: 100,
              y: 48,
            }}
            position="absolute"
            grid={{
              display: true,
              opacity: 90,
              width: "0.25rem",
              color: "neutral-alpha-medium",
              height: "0.25rem",
            }}
          />
          <Background
            mask={{
              x: 80,
              y: 0,
              radius: 100,
            }}
            position="absolute"
            gradient={{
              display: true,
              tilt: -35,
              opacity: 50,
              height: 50,
              width: 35,
              x: 100,
              y: 60,
              colorStart: "accent-solid-medium",
              colorEnd: "static-transparent",
            }}
          />

          <Column
            fillWidth
            horizontal="center"
            gap="32"
            padding="32"
            position="relative"
          >
            <InlineCode radius="xl" shadow="m" fit paddingX="16" paddingY="8">
              Highlights of 2025 |
              <Text onBackground="brand-medium" marginLeft="8">
                Discover more
              </Text>
            </InlineCode>
            <Heading wrap="balance" variant="display-strong-xl" align="center">
              Where ideas
              <br />
              emerges like grains
            </Heading>
            <Text
              wrap="balance"
              variant="body-default-m"
              onBackground="neutral-weak"
              align="center"
            >
              Empowering developers with AI-crafted briefs to streamline
              workflows, foster community engagement, and drive impactful
              solutions in the tech ecosystem.
            </Text>
            <Button
              id="readDocs"
              target="_blank"
              label="Get started"
              href="https://once-ui.com/docs"
              variant="primary"
              size="l"
              arrowIcon
            />
            <Column maxWidth={31} marginTop="8">
              <Textarea
                id="example-textarea"
                label="Submit your open-source startup idea"
                lines={6}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                spellCheck={false}
                maxLength={600}
                description={
                  <>
                    <Row vertical="center">
                      <IconButton
                        icon="infoCircle"
                        size="s"
                        tooltip="Information"
                        tooltipPosition="top"
                        variant="ghost"
                        disabled={true}
                      />
                      <Text>Keep the text under 600 characters</Text>
                    </Row>
                  </>
                  // meul
                }
                labelAsPlaceholder={false}
                resize="none"
              />
              <Button
                style={{
                  position: "absolute",
                  bottom: "45px",
                  right: "15px",
                  zIndex: "9999",
                  transition: "0.3s !important",
                }}
                size="m"
                variant="primary"
                disabled={false}
                className={lexend.className}
                onClick={async () => {
                  const response = await handleSubmit(idea);
                  console.log(response);
                }}
              >
                {isLoading ? (
                  <Row
                    horizontal="center"
                    vertical="center"
                    fillHeight
                    fillWidth
                  >
                    <i
                      className="ri-loader-line"
                      style={{
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    <style jsx>{`
                      @keyframes spin {
                        0% {
                          transform: rotate(0deg);
                        }
                        100% {
                          transform: rotate(360deg);
                        }
                      }
                    `}</style>
                  </Row>
                ) : (
                  <Text variant="label-default-s">Review by AI</Text>
                )}
              </Button>
            </Column>

            <Column
              horizontal="center"
              paddingTop="32"
              paddingBottom="32"
              fillWidth
              gap="24"
            >
              <Line
                maxWidth={4}
                marginBottom="16"
                background="neutral-alpha-medium"
              />
            </Column>
            <Column horizontal="center" fillWidth gap="4">
              <Heading as="h1" variant="display-default-m">
                Showcase
              </Heading>
              <Text
                marginBottom="32"
                align="center"
                onBackground="neutral-weak"
              >
                Tiny open-source projects that are making a big impact
              </Text>

              {/* COMPARE IMAGE */}
              <CompareImage
                radius="xl"
                overflow="hidden"
                border="neutral-alpha-weak"
                leftContent={{ src: "/images/1.jpg", alt: "alt" }}
                rightContent={{ src: "/images/2.jpg", alt: "alt" }}
              />
            </Column>
          </Column>
          {/*ending of the main column */}
        </Column>
      </Column>
    </Column>
  );
}
