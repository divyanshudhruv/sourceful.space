"use client";
import { useEffect } from "react";
import type React from "react";
import { Lexend } from "next/font/google";
import { Space_Grotesk } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: "400" });

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "400" });

import {
  Text,
  Button,
  useToast,
  IconButton,
  Column,
  Row,
} from "@/once-ui/components";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
import supabase from "../../../services/supabase";

export default function Home() {
  const { addToast } = useToast();
  async function google_auth() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      // options: {
      //   redirectTo: `https://123.com`,
      // },
    });
  }

  useEffect(() => {
    async function syncUserInfo() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("User fetch error:", error?.message);
        return;
      }
      const email = user.email;
      const id = user.id;
      const username = user.user_metadata?.full_name || "";
      const profile_picture = user.user_metadata?.avatar_url || "";
      const { error: upsertError } = await supabase.from("user_info").upsert(
        {
          id,
          email,
          username,
          profile_picture,
        },
        { onConflict: "id" }
      );
      if (upsertError) {
        console.error("Upsert error:", upsertError.message);
      } else {
        console.log("User info saved.");
        addToast({
          variant: "danger",
          message: "User already logged in",
          action: (
            <Button
              variant="secondary"
              size="s"
              onClick={() => (window.location.href = `/profile/${username}`)}
            >
              <Text variant="body-default-s">Click to redirect</Text>
            </Button>
          ),
        });
      }

      
    }
    syncUserInfo();
  }, []);
  return (
    <Column
      fillWidth
      paddingY="0"
      paddingX="0"
      fillHeight
      horizontal="center"
      vertical="center"
    >
      <ScrollToTop>
        <IconButton variant="secondary" icon="chevronUp" />
      </ScrollToTop>
      <Column gap="12" horizontal="center">
        <Text
          marginBottom="4"
          variant="heading-strong-xl"
          className={lexend.className}
          style={{
            fontSize: "41px",
            lineHeight: "1em",
            color: "#333",
            fontWeight: "bolder",
            letterSpacing: "-0.8px",
          }}
          align="center"
        >
          Login now
        </Text>

        <Button
          variant="secondary"
          style={{ borderRadius: "5px" }}
          size="m"
          onClick={() => {
            addToast({
              variant: "success",
              message: "Redirecting successfull",
              action: (
                <Button variant="secondary" size="s">
                  Okay
                </Button>
              ),
            });
            google_auth();
          }}
        >
          <Row
            gap="8"
            horizontal="center"
            vertical="center"
            paddingLeft="20"
            paddingRight="20"
          >
            <i
              className="ri-google-line"
              style={{ fontSize: "17px", color: "#333" }}
            ></i>
            <Text
              variant="body-default-xs"
              style={{ fontWeight: "400", color: "#333" }}
              className={lexend.className}
            >
              Continue with Google
            </Text>
          </Row>
        </Button>
      </Column>

      <Row
        fillWidth
        horizontal="center"
        paddingTop="12"
        paddingBottom="12"
        style={{
          position: "absolute",
          bottom: "0",
        }}
      >
        <Button
          variant="tertiary"
          size="s"
          style={{ borderRadius: "5px " }}
          onClick={() => {
            addToast({
              variant: "success",
              message: "Returning to home",
              action: (
                <Button variant="secondary" size="s">
                  Okay
                </Button>
              ),
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 800);
          }}
        >
          <Text
            variant="body-default-s"
            onBackground="neutral-medium"
            align="center"
            style={{ fontSize: "12px", borderRadius: "1px !important" }}
            className={spaceGrotesk.className}
          >
            Return home
          </Text>
        </Button>
      </Row>
    </Column>
  );
}
