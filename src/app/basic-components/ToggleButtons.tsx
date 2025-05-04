import React, { useState } from "react";
import { ToggleButton, Text } from "@/once-ui/components";

export default function ToggleButtons() {
    const toggleButtonsData = [
      { selected: true, theText: "All" },
      { selected: false, theText: "SaaS" },
      { selected: false, theText: "Web" },
      { selected: false, theText: "Mobile" },
      { selected: false, theText: "Tech" },
      { selected: false, theText: "Dashboard" },
      { selected: false, theText: "Dark" },
      { selected: false, theText: "Minimalist" },
      { selected: false, theText: "Productivity" },
      { selected: false, theText: "App" },
      { selected: false, theText: "Light" },
      { selected: false, theText: "Minimal" },
      { selected: false, theText: "Futuristic" },
      { selected: false, theText: "Concept Art" },
      { selected: false, theText: "Analytics" },
  
      { selected: false, theText: "AI" },
    ];
  
    const [toggleStates, setToggleStates] = useState(
      toggleButtonsData.map((data) => ({ ...data }))
    );
  
    const handleToggle = (index: number) => {
      setToggleStates((prevStates) =>
        prevStates.map((state, i) =>
          i === index ? { ...state, selected: !state.selected } : state
        )
      );
    };
  
    return (
      <>
        {toggleStates.map((toggleState, index) => (
          <ToggleButton
            key={index}
            onClick={() => handleToggle(index)}
            selected={toggleState.selected}
            size="m"
            fillWidth={false}
            justifyContent="center"
            style={{
              border: "1px solid #EFEEEB",
              padding: "8px",
            }}
          >
            <Text variant="body-default-xs" style={{ color: "#555" }}>
              {toggleState.theText}
            </Text>
          </ToggleButton>
        ))}
      </>
    );
  }