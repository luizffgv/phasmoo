"use client";

import Card from "./card";

export default function ThemeSwitcher() {
  return (
    <Card>
      <button
        onClick={() => {
          const theme = document.documentElement.classList.toggle("dark")
            ? "dark"
            : "light";
          localStorage.setItem("theme", theme);
        }}
      >
        Toggle theme
      </button>
    </Card>
  );
}
