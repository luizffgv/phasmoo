export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-fit max-w-full rounded-2xl bg-slate-50 p-4 shadow-md transition-colors dark:bg-slate-700">
      {children}
    </div>
  );
}
