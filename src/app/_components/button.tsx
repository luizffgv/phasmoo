import { cva } from "class-variance-authority";
import Link from "next/link";

const buttonCVA = cva(
  [
    "flex",
    "flex-row",
    "justify-center",
    "rounded-xl",
    "px-4",
    "py-2",
    "font-bold",
    "transition-all",
    "disabled:opacity-50",
  ],
  {
    variants: {
      color: {
        primary: [
          "bg-stone-700",
          "dark:bg-stone-100",
          "text-white",
          "dark:text-stone-700",
          "hover:brightness-125",
          "dark:hover:brightness-90",
          "disabled:hover:brightness-100",
          "dark:disabled:hover:brightness-100",
        ],
        danger: [
          "bg-red-400",
          "text-stone-700",
          "hover:brightness-125",
          "disabled:hover-brightness-100",
        ],
        weak: [
          "bg-stone-200",
          "dark:bg-stone-700",
          "text-inherit",
          "hover:brightness-90",
          "dark:hover:brightness-125",
          "disabled:hover:brightness-100",
          "dark:disabled:hover:brightness-100",
        ],
      },
    },
    defaultVariants: {
      color: "primary",
    },
  },
);

export type Props = {
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
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
        /** Whether the button is disabled. */
        disabled?: boolean;
        role?: React.HTMLAttributes<HTMLButtonElement>["role"];
        "aria-checked"?: boolean;
      }
    | {
        /** Link the button will send you to. */
        href: string;
        /** Same as <a>'s target. */
        target?: React.HTMLAttributeAnchorTarget;
      }
  );

export default function Button(props: Props) {
  const color =
    "danger" in props ? "danger" : "weak" in props ? "weak" : "primary";

  return (
    <>
      {"href" in props ? (
        <Link
          href={props.href}
          target={props.target}
          className={`${buttonCVA({ color })} ${props.className ?? ""}`}
          aria-label={props["aria-label"]}
          aria-labelledby={props["aria-labelledby"]}
        >
          {props.children}
        </Link>
      ) : (
        <button
          className={`${buttonCVA({ color })} ${props.className ?? ""}`}
          role={props["role"]}
          aria-label={props["aria-label"]}
          aria-checked={props["aria-checked"]}
          aria-labelledby={props["aria-labelledby"]}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      )}
    </>
  );
}
