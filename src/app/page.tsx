// Example page: delete the content or rework the blocks
"use client";

import type React from "react";

// import { Lexend } from "next/font/google";
// import { Space_Mono } from "next/font/google";
// import { Space_Grotesk } from "next/font/google";
// import { Poppins } from "next/font/google";
// const lexend = Lexend({ subsets: ["latin"], weight: "400" });
// const lexendBold = Lexend({ subsets: ["latin"], weight: "700" });
// const spaceMono = Space_Mono({ subsets: ["latin"], weight: "400" });
// const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });
// const poppins = Poppins({ subsets: ["latin"], weight: "700" });
import { useToast, Column, IconButton, Text } from "@/once-ui/components";
import { ScrollToTop } from "@/once-ui/components/ScrollToTop";
// import supabase from "../../../services/supabase";
import NavBar from "./basic-components/NavBar";
import Hero from "./basic-components/Hero";
import Pins from "./basic-components/Pins";
import Footer from "./basic-components/Footer";
import Theme from "./basic-components/Theme";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./page.css";
import supabase from "services/supabase";

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
