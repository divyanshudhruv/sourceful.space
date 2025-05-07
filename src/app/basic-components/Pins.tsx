import React from "react";
import { Row, Column, Button, Text } from "@/once-ui/components";
import TopPin from "./TopPin";
import Pin from "./Pin";
export default function Pins() {
  return (
    <div id="pins">
      <Column horizontal="center" style={{ maxWidth: "800px" }} gap="32">
        <Pin />
      </Column>
    </div>
  );
}
