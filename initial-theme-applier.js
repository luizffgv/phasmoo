const theme = localStorage.getItem("theme");
const deviceIsDark = matchMedia("(prefers-color-scheme: dark)").matches;
if (theme == "dark" || (theme == undefined && deviceIsDark))
  document.documentElement.classList.add("dark");
