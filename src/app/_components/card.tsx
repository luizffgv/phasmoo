export default function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-fit bg-slate-50 dark:bg-slate-700 rounded-2xl">
      {children}
    </div>
  );
}
