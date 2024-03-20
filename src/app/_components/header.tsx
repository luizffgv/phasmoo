import Link from "next/link";
import Logo from "./logo";
import Settings from "./settings";
import Status from "./status";

export default function Header() {
  return (
    <header className="relative flex flex-row justify-between bg-stone-200 p-4 shadow-lg shadow-stone-200 dark:bg-stone-900 dark:shadow-stone-900">
      <Link href="/">
        <div className="flex flex-row items-center gap-4">
          <Logo fill="text-stone-700 dark:text-stone-100"></Logo>
          <h1 className="text-lg font-bold">Phasmoo</h1>
        </div>
      </Link>
      <div className="absolute left-1/2 top-1/2 hidden translate-x-[-50%] translate-y-[-50%] text-center sm:block">
        <Status></Status>
      </div>
      <Settings></Settings>
    </header>
  );
}
