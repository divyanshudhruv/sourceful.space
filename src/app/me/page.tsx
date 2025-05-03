// Example page: delete the content or rework the blocks
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Lexend } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Poppins } from "next/font/google";

import { Lora } from "next/font/google";
import { IconType } from "react-icons";
import {
  HiChevronDown,
  HiChevronRight,
  HiChevronLeft,
  HiOutlineArrowPath,
  HiCheck,
} from "react-icons/hi2";

export const iconLibrary: Record<string, IconType> = {
  chevronDown: HiChevronDown,
  chevronRight: HiChevronRight,
  chevronLeft: HiChevronLeft,
  refresh: HiOutlineArrowPath,
  check: HiCheck,
};
const lexend = Lexend({ subsets: ["latin"], weight: "400" });
const lexendBold = Lexend({ subsets: ["latin"], weight: "700" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });
const poppins = Poppins({ subsets: ["latin"], weight: "700" });
const lora = Lora({ subsets: ["latin"], weight: "500" });
import {
  Heading,
  Text,
  Button,
  Icon,
  InlineCode,
  Logo,
  Input,
  Grid,
  Avatar,
  AvatarGroup,
  Textarea,
  PasswordInput,
  SegmentedControl,
  SmartLink,
  UserMenu,
  Dialog,
  ToggleButton,
  Feedback,
  SmartImage,
  Dropdown,
  Line,
  Arrow,
  LogoCloud,
  Background,
  Select,
  Option,
  useToast,
  Card,
  Flex,
  Fade,
  StatusIndicator,
  DateRangePicker,
  type DateRange,
  TiltFx,
  HoloFx,
  IconButton,
  TagInput,
  Tag,
  Switch,
  Column,
  Row,
  StyleOverlay,
  CompareImage,
  Toast,
  MegaMenu,
  ThemeSwitcher,
} from "@/once-ui/components";
import { CodeBlock, MediaUpload } from "@/once-ui/modules";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
import { fit } from "sharp";
import supabase from "../../../services/supabase";

export default function Home() {
  const { addToast } = useToast();

  return (
    <Column fillWidth paddingY="0" paddingX="0" fillHeight horizontal="center">
      <ScrollToTop>
        <IconButton variant="secondary" icon="chevronUp" />
      </ScrollToTop>
      <NavBar />
      <Hero />
      <TotalPins />
    </Column>
  );
}

function NavBar() {
  return (
    <Row
      borderBottom="neutral-medium"
      borderWidth={2}
      fillWidth
      // background="neutral-strong"
      content="center"
      vertical="center"
      horizontal="space-between"
      paddingX="m"
      paddingY="4"
    >
      <Row
        style={{ minWidth: "172px", maxWidth: "172px" }}
        horizontal="start"
        vertical="center"
      >
        <Button
          variant="secondary"
          size="s"
          href="#"
          style={{ backgroundColor: "white" }}
        >
          <Text variant="body-default-s" className={lexend.className}>
            sourceful.space
          </Text>
        </Button>
        <Row>
          <Flex width={1}></Flex>
          <MegaNavBar />
        </Row>{" "}
      </Row>

      <Row vertical="center" horizontal="center">
        <UserMenu
          style={{ scale: "0.85" }}
          name="Divyanshu Dhruv"
          subline="Developer"
          avatarProps={{
            empty: true,
            statusIndicator: {
              color: "gray",
            },
          }}
          loading={false}
          selected={false}
          minWidth={2}
          maxWidth={2}
          dropdown={
            <>
              <Option value="Profile" label="Profile" />
              <Option value="Settings" label="Settings" />
              <Option value="Subscription" label="Subscription" />
              <Line />
              <Option value="Log out" label="Log out" />
            </>
          }
        />
      </Row>
    </Row>
  );
}

function MegaNavBar() {
  return (
    <MegaMenu
      style={{ scale: "1" }}
      menuGroups={[
        {
          label: "Home",
          suffixIcon: "check",
        },
        {
          label: "Pins",
          suffixIcon: "chevron-down",
        },
        {
          label: "Community",
          suffixIcon: "chevron-down",
        },
      ]}
    />
  );
}



function Cards({
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
