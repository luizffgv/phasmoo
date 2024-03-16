import { createContext } from "react";

export interface SettingsContext {
  setButtonIconMode(mode: boolean): void;
  /** Whether evidence buttons will be icons. */
  buttonIconMode: boolean;
}

export const SettingsContext = createContext<SettingsContext>({
  setButtonIconMode: () => {},
  buttonIconMode: true,
});
