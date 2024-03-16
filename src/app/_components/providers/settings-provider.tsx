"use client";

import { SettingsContext } from "@/contexts/settings-context";
import { useEffect, useState } from "react";

export interface Props {
  children: React.ReactNode;
}

export default function SettingsProvider({ children }: Props) {
  const [buttonIconMode, setButtonIconMode] = useState(false);

  useEffect(() => {
    setButtonIconMode(!(localStorage.getItem("button-icon-mode") == "false"));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        setButtonIconMode: (mode) => {
          localStorage.setItem("button-icon-mode", String(mode));
          setButtonIconMode(mode);
        },
        buttonIconMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
