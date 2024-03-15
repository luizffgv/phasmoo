import EvidencePicker from "./_components/evidence-picker";
import EvidenceProvider from "./_components/providers/evidence-provider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <EvidenceProvider>
        <EvidencePicker></EvidencePicker>
      </EvidenceProvider>
    </main>
  );
}
