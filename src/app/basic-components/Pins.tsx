import React from "react";
import { Column } from "@/once-ui/components";
import Pin from "./Pin";
export default function Pins() {
  return (
    <div id="pins">
      <Column horizontal="center">
        <Pin />
      </Column>
    </div>
  );
}
