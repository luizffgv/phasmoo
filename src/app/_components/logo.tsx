export interface Props {
  /** Tailwind text fill class for the logo. */
  fill: `text-${string}`;
}

export default function Logo({ fill }: Props) {
  return (
    <svg viewBox="0 0 1024 1024" width="32" height="32">
      <use href="/logo.svg#logo" className={fill}></use>
    </svg>
  );
}
