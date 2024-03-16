"use client";

import { SettingsContext } from "@/contexts/settings-context";
import { useContext } from "react";
import ToggleButton from "./toggle-button";

export default function EvidenceIconsToggler() {
  const { buttonIconMode, setButtonIconMode } = useContext(SettingsContext);

  return (
    <ToggleButton
      onClick={() => setButtonIconMode(!buttonIconMode)}
      pressed={buttonIconMode}
    >
      Use icons in buttons
    </ToggleButton>
  );
}
