// Example page: delete the content or rework the blocks
"use client";

import type React from "react";


import {  Column, IconButton } from "@/once-ui/components";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
import NavBar from "./basic-components/NavBar";
import Hero from "./basic-components/Hero";
import Pins from "./basic-components/Pins";
import Footer from "./basic-components/Footer";
import Theme from "./basic-components/Theme";

import "./page.css";

export default function Home() {
  // useEffect(() => {
  //   const checkSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     if (!session) {
  //       window.location.href = "/login";
  //     }
  //   };

  //   checkSession();
  // }, []);

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
          <Hero />
          <Pins />
          <Footer />
       
      </Column>
      <Theme />
    </>
  );
}
