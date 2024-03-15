"use client";

import Button from "./button";
import Card from "./card";

export default function ThemeSwitcher() {
  return (
    <Card>
      <Button
        onClick={() => {
          const theme = document.documentElement.classList.toggle("dark")
            ? "dark"
            : "light";
          localStorage.setItem("theme", theme);
        }}
      >
        Toggle theme
      </Button>
    </Card>
  );
}
