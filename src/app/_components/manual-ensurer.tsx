"use client";

import { ModalContext } from "@/contexts/modal";
import { useContext, useLayoutEffect } from "react";
import Button from "./button";

/** Ensures the user has read the manual, or dismissed it. */
export default function ManualEnsurer() {
  const { setModal } = useContext(ModalContext);

  useLayoutEffect(() => {
    const read = localStorage.getItem("manual-read") === "true";
    if (!read)
      setModal(
        <div className="flex flex-col gap-4">
          <p>It seems that it&apos;s your first time here.</p>
          <p>Do you want to read the manual?</p>
          <div
            className="flex flex-row justify-center gap-2"
            onClick={(event) => {
              // If a button was clicked
              if (event.target != event.currentTarget) setModal(null);
            }}
          >
            <Button href="/manual">Sure</Button>
            <Button
              onClick={() => {
                localStorage.setItem("manual-read", "true");
              }}
              danger
            >
              No, skip it
            </Button>
          </div>
        </div>,
      );
  }, [setModal]);

  return <></>;
}
