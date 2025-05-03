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

export default function Home() {
  const { addToast } = useToast();

  return (
    <Column fillWidth paddingY="0" paddingX="0" fillHeight horizontal="center">
      <ScrollToTop>
        <IconButton variant="secondary" icon="chevronUp" />
      </ScrollToTop>

      <NavBar />

      <Hero />
      <Column gap="20">
        <Column horizontal="center">
          <Grid
            marginTop="40"
            columns={3}
            gap="24"
            padding="24"
            fillWidth={false}
          >
            <Cards
              id="card1"
              investible={true}
              imageUrl="https://cdn.dribbble.com/userupload/17124761/file/original-d497b2359d86be010307b1340f18ac4b.png?resize=1024x768&vertical=center"
              heading="HelloLink"
              body="A platform that connects developers with startups looking for talent. Developers can create profiles, showcase their skills, and apply for projects that match their expertise."
            ></Cards>
          </Grid>
          <Row />
        </Column>
      </Column>
    </Column>
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
      border="neutral-medium"
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
        paddingY="8"
        gap="8"
        vertical="center"
        textVariant="label-default-s"
        onBackground="neutral-weak"
        horizontal="space-between"
      >
        <Row gap="4">
          <IconButton
            size="l"
            tooltip="Downvote"
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
            tooltip="Upvote"
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
function LogoClouds() {
  return (
    <Column horizontal="center" gap="20">
      <LogoCloud
        limit={3}
        fillWidth={false}
        logos={[
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
          {
            href: "https://once-ui.com",
            icon: true,
            size: "m",
          },
          {
            href: "https://enroll.dopler.app",
            icon: false,
            size: "l",
            wordmarkSrc:
              "https://repository-images.githubusercontent.com/177394769/7a8420c4-f55c-4ce5-821b-593dc2b0776c",
          },
          {
            href: "https://club.dopler.io",
            icon: false,
            size: "m",
            wordmarkSrc:
              "https://images.ctfassets.net/ykljvmtfxwdz/4FoI5GYGR81roJeLMC11aN/39e40f37e7234756f2302c157a12f8f3/home-vercel-logo.png?w=500&h=100&q=100&fm=png",
          },
        ]}
        columns="3"
        mobileColumns="1"
      />
      <Line width={10}></Line>
    </Column>
  );
}
function Hero() {
  return (
    <>
      {" "}
      <Column
        fillWidth
        style={{ height: "fit-content" }}
        paddingX="xl"
        horizontal="center"
      >
        <Flex paddingX="xl" direction="column" paddingY="s">
          <Flex fillWidth style={{ height: "60px" }}></Flex>
          <Text
            variant="heading-strong-xl"
            className={lexend.className}
            style={{ fontSize: "55px", lineHeight: "1em", color: "#222" }}
            align="center"
          >
            AI powered project briefs <br></br>for developers
          </Text>
          <Text
            variant="body-default-s"
            onBackground="neutral-medium"
            align="center"
            className={spaceGrotesk.className}
            style={{ marginTop: "15px" }}
          >
            Empowering developers and innovators to collaborate, create, and
            shape the future of <br />
            technology through AI-driven project briefs and meaningful
            connections.{" "}
          </Text>
          <Row fillWidth horizontal="center" marginTop="16" marginBottom="20">
            {" "}
            <Button id="trigger" variant="primary" size="m" href="#">
              <Row>
                Get started now
                <Arrow
                  trigger="#trigger"
                  color="onSolid"
                  style={{ scale: "1.2", marginTop: "3px", marginLeft: "3px" }}
                />
              </Row>
            </Button>
          </Row>
        </Flex>
      </Column>
      <Column
        fillWidth
        style={{ height: "fit-content" }}
        paddingX="xl"
        horizontal="center"
      >
        <Flex
          style={{
            height: "fit-content",
            marginTop: "-40px",
            width: "fit-content",
          }}
          direction="column"
          paddingY="xs"
        >
          <LogoClouds />
        </Flex>
      </Column>
    </>
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
        <Button variant="secondary" size="s" href="#" style={{backgroundColor: "white"}}>
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
