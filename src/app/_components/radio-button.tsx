export type Props = {
  checked?: boolean;
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
} & (
  | {
      "aria-label"?: string;
    }
  | {
      "aria-labelledby"?: string;
    }
);

/** A radio button. Must be in a container with the `radiogroup` role. */
export default function RadioButton(props: Props) {
  const bg = props.checked
    ? "bg-stone-700 dark:bg-stone-100"
    : "bg-stone-200 dark:bg-stone-700";

  const text = props.checked
    ? "text-white dark:text-stone-700"
    : "text-inherit";

  return (
    <button
      className={`rounded-xl px-4 py-2 font-bold transition-colors ${bg} ${text}`}
      onClick={props.onClick}
      role="radio"
      aria-checked={props.checked}
      aria-label={"aria-label" in props ? props["aria-label"] : undefined}
      aria-labelledby={
        "aria-labelledby" in props ? props["aria-labelledby"] : undefined
      }
    >
      {props.children}
    </button>
  );
}
