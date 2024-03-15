import EvidencePicker from "./_components/evidence-picker";
import GhostList from "./_components/ghost-list";
import EvidenceProvider from "./_components/providers/evidence-provider";

export default function Home() {
  return (
    <EvidenceProvider>
      <main className="overflow-y-auto max-w-full grow flex flex-col sm:flex-col-reverse gap-8 items-center justify-between sm:justify-end">
        <GhostList></GhostList>
        <EvidencePicker></EvidencePicker>
      </main>
    </EvidenceProvider>
  );
}
