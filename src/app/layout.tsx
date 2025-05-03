import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from "classnames";

import { baseURL, style, meta, font, effects } from "@/app/resources/config";
import {
  Background,
  Column,
  Flex,
  ToastProvider,
  ThemeProvider,
} from "@/once-ui/components";

import { opacity, SpacingToken } from "@/once-ui/types";
import { Meta, Schema } from "@/once-ui/modules";
import { Lexend } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import { Lora } from "next/font/google";

const primary = Lexend({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const secondary = Space_Grotesk({
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
});

const tertiary = Lora({
  variable: "--font-tertiary",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    canonical: meta.home.canonical,
    image: meta.home.image,
    robots: meta.home.robots,
    alternates: meta.home.alternates,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillHeight
      background="page"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-border={style.border}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-surface={style.surface}
      data-transition={style.transition}
      //      data-scaling={style.scaling} // Removed as 'scaling' does not exist in 'style'
      className={classNames(
        font.primary.variable,
        font.secondary.variable,
        font.tertiary.variable,
        font.code.variable
      )}
    >
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={meta.home.title}
        description={meta.home.description}
        path={meta.home.path}
      />
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <It's not dynamic nor a security issue.>
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
          const root = document.documentElement;
          root.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
            } catch (e) {
          document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `,
          }}
        />
      </head>
      <ThemeProvider>
        <ToastProvider>
          <Column as="body" fillWidth margin="0" padding="0">
            {children}
          </Column>
        </ToastProvider>
      </ThemeProvider>
    </Flex>
  );
}
