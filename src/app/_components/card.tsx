export default function Card({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-stone-50 p-4 shadow-sm transition-colors dark:bg-stone-800 ${className}`}
    >
      {children}
    </div>
  );
}
