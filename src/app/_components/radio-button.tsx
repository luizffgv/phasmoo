import Button from "./button";

export type Props = {
  checked?: boolean;
  disabled?: boolean;
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
  return (
    <Button
      onClick={props.onClick}
      role="radio"
      aria-checked={props.checked}
      aria-label={"aria-label" in props ? props["aria-label"] : undefined}
      aria-labelledby={
        "aria-labelledby" in props ? props["aria-labelledby"] : undefined
      }
      disabled={props.disabled}
      {...(props.checked ? { primary: true } : { weak: true })}
    >
      {props.children}
    </Button>
  );
}
