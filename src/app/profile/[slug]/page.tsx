// Example page: delete the content or rework the blocks
"use client";

import type React from "react";

import { Column, IconButton } from "@/once-ui/components";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
import NavBar from "./../../basic-components/NavBar";
import Profile from "./Profile";
import Footer from "./../../basic-components/Footer";
import Theme from "./../../basic-components/Theme";


export default function Home() {
 
  return (
    <>
      <Column
        fillWidth
        paddingY="0"
        paddingX="0"
        fillHeight
        horizontal="center"
      >
        <ScrollToTop>
          <IconButton variant="secondary" icon="chevronUp" />
        </ScrollToTop>
        <NavBar />
        <Profile />
        <Footer />
      </Column>
      <Theme />
    </>
  );
}
