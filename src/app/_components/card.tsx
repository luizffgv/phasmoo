export default function Card({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-fit max-w-full rounded-2xl bg-slate-50 p-4 shadow-md transition-colors dark:bg-slate-700 ${className}`}
    >
      {children}
    </div>
  );
}
