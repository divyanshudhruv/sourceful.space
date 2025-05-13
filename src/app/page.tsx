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
          <Row gap="12" hide="s">
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
            />
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
              y: 48,
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
            <Column maxWidth={30} marginTop="8">
              <Button
                style={{
                  position: "absolute",
                  bottom: "45px",
                  right: "15px",
                  zIndex: "9999",
                }}
                size="m"
                variant="primary"
                disabled={false}
                className={lexend.className}
              >
                <Text variant="label-default-s">Review by AI</Text>
              </Button>

              <Textarea
                id="example-textarea"
                label="Describe your open-source startup idea"
                lines={5}
                description={
                  <>
                    <Row vertical="center">
                      <IconButton
                        icon="infoCircle"
                        size="s"
                        tooltip="Tooltip"
                        tooltipPosition="top"
                        variant="ghost"
                        disabled={true}
                      />
                      <Text>Keep the text under 500 words</Text>
                    </Row>
                  </>
                }
                labelAsPlaceholder={false}
                resize="none"
              />
            </Column>

            <Column horizontal="center" paddingTop="8" fillWidth gap="24">
              <Line
                maxWidth={4}
                marginBottom="16"
                background="neutral-alpha-medium"
              />
            </Column>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
