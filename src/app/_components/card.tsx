export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="transition-colors w-fit p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl shadow-md">
      {children}
    </div>
  );
}
