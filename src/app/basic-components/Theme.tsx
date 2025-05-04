import { ThemeProvider, ThemeSwitcher, Column } from "@/once-ui/components";

export default function Theme() {
  return (
    <Column
      padding="8"
      radius="l"
      style={{ position: "fixed",bottom:"10px",left:"10px",pointerEvents:"none",cursor:"pointer !important" }}
    >
      <ThemeSwitcher padding="4"/>
    </Column>
  );
}
