export interface SectionProps {
  children: React.ReactNode;
  title: string;
  level: 2 | 3 | 4 | 5 | 6;
}

export default function Section({ children, title, level }: SectionProps) {
  return (
    <section className="flex flex-col gap-4">
      {level == 2 ? (
        <h2 className="mt-8 text-xl font-bold">{title}</h2>
      ) : level == 3 ? (
        <h3 className="mt-4 text-lg font-bold">{title}</h3>
      ) : level == 4 ? (
        <h4 className="font-bold">{title}</h4>
      ) : level == 5 ? (
        <h5 className="font-bold">{title}</h5>
      ) : (
        <h6 className="font-bold">{title}</h6>
      )}
      {children}
    </section>
  );
}
