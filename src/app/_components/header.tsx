import Logo from "./logo";
import Settings from "./settings";

export default function Header() {
  return (
    <header className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-4">
        <Logo fill="text-stone-700 dark:text-stone-100"></Logo>
        <h1 className="text-lg font-bold">Phasmoo</h1>
      </div>
      <Settings></Settings>
    </header>
  );
}