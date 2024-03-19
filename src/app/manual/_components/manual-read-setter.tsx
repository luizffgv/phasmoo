"use client";

import { useEffect } from "react";

/** Sets the manual as read in localstorage. */
export default function ManualReadSetter() {
  useEffect(() => {
    localStorage.setItem("manual-read", "true");
  }, []);

  return <></>;
}
