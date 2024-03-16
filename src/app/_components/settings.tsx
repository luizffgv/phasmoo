"use client";

import { useContext } from "react";
import Button from "./button";
import { ModalContext } from "@/contexts/modal";
import ThemeSwitcher from "./theme-switcher";
import EvidenceIconsToggler from "./evidence-icons-toggler";

export default function Settings() {
  const { setModal } = useContext(ModalContext);

  return (
    <Button
      onClick={() =>
        setModal(
          <div className="flex flex-col gap-4">
            <ThemeSwitcher></ThemeSwitcher>
            <Button
              href="https://github.com/luizffgv/spirit-box-web"
              target="_blank"
            >
              View source code
            </Button>
            <EvidenceIconsToggler></EvidenceIconsToggler>
          </div>,
        )
      }
      aria-label="Open menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        viewBox="0 0 1024 1024"
        fill="currentColor"
      >
        <path d="M245.76 512c0 67.865-55.015 122.88-122.88 122.88S0 579.865 0 512s55.015-122.88 122.88-122.88S245.76 444.135 245.76 512zm389.12 0c0 67.865-55.015 122.88-122.88 122.88S389.12 579.865 389.12 512 444.135 389.12 512 389.12 634.88 444.135 634.88 512zm389.12 0c0 67.865-55.015 122.88-122.88 122.88S778.24 579.865 778.24 512s55.015-122.88 122.88-122.88S1024 444.135 1024 512z" />
      </svg>
    </Button>
  );
}
