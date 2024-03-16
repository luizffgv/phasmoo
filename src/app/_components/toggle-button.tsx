import Button from "./button";

export type Props = {
  /** Whether the button is pressed. */
  pressed: boolean;
  disabled?: boolean;
  /** Click event handler. Use it to modify button pressed state. */
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

/** A toggle button. */
export default function ToggleButton(props: Props) {
  return (
    <Button
      onClick={props.onClick}
      aria-pressed={props.pressed}
      aria-label={"aria-label" in props ? props["aria-label"] : undefined}
      aria-labelledby={
        "aria-labelledby" in props ? props["aria-labelledby"] : undefined
      }
      disabled={props.disabled}
      {...(props.pressed ? { primary: true } : { weak: true })}
    >
      {props.children}
    </Button>
  );
}
