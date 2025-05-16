// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://demo.once-ui.com";

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const primaryFont = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const monoFont = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});
import { Work_Sans } from "next/font/google";
import { DM_Sans } from "next/font/google";

const primary = Work_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const secondary = DM_Sans({
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
});

const font = {
  primary: primary,
  secondary: secondary,
  tertiary: secondary,
  code: monoFont,
};

// default customization applied to the HTML in the main layout.tsx
// const style = {
//   theme: "dark", // dark | light - not needed when using ThemeProvider
//   neutral: "gray", // sand | gray | slate
//   brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
//   accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
//   solid: "contrast", // color | contrast | inverse
//   solidStyle: "flat", // flat | plastic
//   border: "playful", // rounded | playful | conservative
//   surface: "filled", // filled | translucent
//   transition: "all", // all | micro | macro
//   scaling: "100", // 90 | 95 | 100 | 105 | 110
// };

const style = {
  theme: "light",
  brand: "yellow",
  accent: "yellow",
  neutral: "gray",
  border: "playful",
  solid: "contrast",
  solidStyle: "flat",
  surface: "filled",
  transition: "all",
};
const effects = {
  mask: {
    cursor: false,
    x: 60,
    y: -40,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 50,
    x: 80,
    y: 0,
    width: 70,
    height: 50,
    tilt: -40,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 20,
    size: "2",
    color: "brand-on-background-weak",
  },
  grid: {
    display: true,
    opacity: 100,
    color: "accent-alpha-weak",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

// metadata for pages
const meta = {
  home: {
    title: "Sourceful Space: Redefining open-source",
    description:
      "Sourceful Space is a platform that connects developers and designers to create open-source projects.",
    baseURL: "https://sourceful-space.vercel.app",
    type: "website",
    image: "/images/cover.jpg",
    path: "/",
    robots: "index,follow",
    alternates: [{ href: "https://sourceful.space", hrefLang: "en" }],
  },
  author: {
    name: "Divyanshu Dhruv",
    url: "https://divyanshudhruv.is-a.dev",
  },
  // add more routes and reference them in page.tsx
};

// default schema data
const schema = {
  logo: "",
  type: "website",
  url: baseURL,
  title: "Sourceful Space",
  name: "Sourceful Space",
  description: meta.home.description,
  email: "divyanshudhruv@proton.me",
};

// social links

export { baseURL, font, style, meta, schema, effects };
