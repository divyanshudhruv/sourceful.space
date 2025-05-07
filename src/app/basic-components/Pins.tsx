import React from "react";
import {  Column } from "@/once-ui/components";
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
