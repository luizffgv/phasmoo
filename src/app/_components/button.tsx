import Link from "next/link";

export type Props = {
  children: React.ReactNode;
  "aria-label"?: string;
  className?: string;
} & (
  | {
      /** The book will have the primary color. */
      primary?: true;
    }
  | {
      /** The button will have a danger color. */
      danger: true;
    }
  | {
      /** The button will have a weak color. */
      weak: true;
    }
) &
  (
    | {
        /** Handler for clicks on the button. */
        onClick: React.MouseEventHandler;
      }
    | {
        /** Link the button will send you to. */
        href: string;
        /** Same as <a>'s target. */
        target?: React.HTMLAttributeAnchorTarget;
      }
  );

export default function Button(props: Props) {
  const bg =
    "danger" in props
      ? "bg-red-400"
      : "weak" in props
        ? "bg-stone-200 dark:bg-stone-700"
        : "bg-stone-700 dark:bg-stone-100";

  const text =
    "danger" in props
      ? "text-stone-700"
      : "weak" in props
        ? "text-inherit"
        : "text-white dark:text-stone-700";

  const hover =
    "danger" in props
      ? "hover:brightness-125"
      : "weak" in props
        ? "hover:brightness-90 dark:hover:brightness-125"
        : "hover:brightness-125 dark:hover:brightness-90";

  return (
    <>
      {"href" in props ? (
        <Link
          href={props.href}
          target={props.target}
          className={`rounded-xl px-4 py-2 font-bold transition-all ${text} ${bg} ${hover} ${props.className ?? ""}`}
          aria-label={props["aria-label"]}
        >
          {props.children}
        </Link>
      ) : (
        <button
          className={`rounded-xl px-4 py-2 font-bold transition-all ${text} ${bg} ${hover} ${props.className ?? ""}`}
          aria-label={props["aria-label"]}
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
    </>
  );
}
