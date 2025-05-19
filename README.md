# 🌌☄️ **Sourceful Space**

Redefining **`open-source`** collaboration for indie **`creators`**, **`developers`**, and **`designers`**. 🌍✨

<br>

![GitHub stars](https://img.shields.io/github/stars/divyanshudhruv/sourceful.space?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/divyanshudhruv/sourceful.space.svg?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/divyanshudhruv/sourceful.space.svg?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/divyanshudhruv/sourceful.space.svg?style=for-the-badge)
![Top language](https://img.shields.io/github/languages/top/divyanshudhruv/sourceful.space.svg?style=for-the-badge)

<br>

> [!IMPORTANT]\
> If you find sourceful.space helpful and want to support the project, please give it a **star** on GitHub! Your star helps the development.

<br>

> [!NOTE]\
> Expect bugs and errors because the project is currently in `beta` stage.

<br>

## ✨ **What is Sourceful Space?** ✨

**[Sourceful Space](https://sourceful-space.vercel.app)** is a modern, **`open-source`** platform that empowers developers and designers to **`explore`**, **`share`**, **`invest`** and **`contribute`** to open-source and **`early-stage`** startup projects ✨. It leverages a robust design system, **`AI-powered`** feedback 🤖, and a beautiful, customizable UI 🎨 to streamline project building and 🏠 community **`engagement`**.

<br>

## 🛠️ **Tech Stack** 🛠️

- ⚛️ **`Next.js`** (React Framework)
- 🟦 **`TypeScript`** (Type Safety)
- 🎨 **`SCSS`** (Design Tokens, Theming)
- 🦸 **`Supabase`** (Database & Auth)
- 🔤 **`Google Fonts`** (Typography)
- ▲ **`Vercel`** (Deployment)
- 🌈 **`PrismJS`** (Code Highlighting)
- 🤖 **`AI Integration`** (Google Gemini API)
- 🧩 **`Custom Once-UI Design System`** (Reusable components & tokens)

<br>

## 🤔 **Why Sourceful Space?** 🤔

- ⚡ **`Consistency & Speed:`** Use a design system with tokens and components for a unified, fast workflow.
- 🤖 **`AI-Powered:`** Instantly review your open-source startup ideas with AI feedback.
- 🌱 **`Open Source:`** Fork, contribute, and make it your own.
- 👥 **`Community-Driven:`** Built for and by indie creators.

<br>

## 🚦 **Getting Started for development** 🚦

1. 🧑‍💻 **`Clone or Fork the repository:`**
   ```bash
   git clone https://github.com/divyanshudhruv/sourceful.space.git
   cd sourceful.space
   git checkout -b your-branch-name
   npm install
   npm run dev
   ```
2. 🔑 **`Set up environment variables if any:`**

   - Copy `.env.local.example` to `.env.local` and add your Supabase and Gemini API keys.

3. 🌐 **`Visit`** `http://localhost:3000` in your browser.

4. 🔄 **`Start coding:`** Make changes, and see them live in your browser.

5. 🧪 **`Pull request:`** Submit a pull request after creating a new branch.

<br>

## 🧑‍💻 **How to Use (web)** 🧑‍💻

- 🔍 **`Explore Projects:`** Browse open-source and early startup projects on the homepage. 🏠
- 💡 **`Submit Your Idea:`**
  - Use the textarea labeled _"`Describe your open-source startup idea`"_.
  - Click **Review by AI** to get instant feedback powered by **`AI`**. 🤖
- 🚀 **`Add Projects:`**
  - Press <kbd>Ctrl</kbd>+<kbd>K</kbd> to open the command palette.
  - Select **Submit Project** (or press <kbd>P</kbd> in the palette).
  - Enter your project details, tech stack, and upload media. 📦
  - Hit **Submit** to share your project with the community!
- 🎨 **`Theme Switching:`**
  - Use the theme switcher in the UI or the keybind (see below) to toggle between light and dark mode.
- 🖼️ **`Media Uploads:`**
  - Use the `MediaUpload` component to add images/assets to your project.
- ⚡ **`Command Palette:`**
  - Press <kbd>Ctrl</kbd>+<kbd>K</kbd> (Windows/Linux) or <kbd>⌘</kbd>+<kbd>K</kbd> (Mac) to open the command bar for quick navigation and actions.

<br>

## ⌨️ **Keybinds & Shortcuts** ⌨️

| 🎯 Action       | 💻 Keybind (Windows/Linux) | 🍏 Keybind (Mac) | 📝 Description                 |
| --------------- | -------------------------- | ---------------- | ------------------------------ |
| Command Palette | `Ctrl + K`                 | `⌘ + K`          | Open command bar (Kbar)        |
| Scroll to Top   | `T`                        | `T`              | Instantly scroll to top        |
| Theme Toggle    | `Shift + D`                | `Shift + D`      | Switch between light/dark mode |
| Go Home         | `H` (in Kbar)              | `H`              | Navigate to homepage           |
| Submit Project  | `P` (in Kbar)              | `P`              | Open project submission dialog |
| Sign Up         | `S` (in Kbar)              | `S`              | Open sign up dialog            |
| Log Out         | `O` (in Kbar)              | `O`              | Log out                        |

> 💡 _Tip: All Kbar actions are searchable and can be triggered by keyboard!_

<br>

## 🧩 **Design System & Customization (dev)** 🧩

- 🎨 **Tokens:**
  - All design tokens (colors, spacing, typography) are in [`src/once-ui/tokens/`](src/once-ui/tokens/).
  - Change theme, brand, accent, and more in [`src/app/resources/config.js`](src/app/resources/config.js).
- 🧱 **Components:**
  - Use any component from `@/once-ui/components` in your pages.
  - Example:
    ```tsx
    import { Button, Text, Heading } from "@/once-ui/components";
    ```
- 🌗 **Theming:**
  - Supports light/dark mode and multiple color schemes.
  - Easily override tokens for your own branding.

<br>

## 🤖 **AI Startup Review** 🤖

- ✍️ **`Describe your idea`** in the textarea.
- 🖱️ **`Click`** _Review by AI_.
- ⚡ **`Get instant feedback:`** The AI will tell you if your idea is a good open-source startup and why (or why not).

<br>

## 📄 **License** 📄

See [`LICENSE`](LICENSE) for details. 📜

<br>

## 🏷️ **Credits** 🏷️

- 🧩 Built with [Once UI](https://once-ui.com)
- 🦸 Powered by [Supabase](https://supabase.com) & [Google Gemini](https://ai.google.dev/gemini-api)

<br>

_Crafted with ☕ by the indie creators for the open-source community._
