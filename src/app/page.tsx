import EvidencePicker from "./_components/evidence-picker";
import GhostList from "./_components/ghost-list";
import EvidenceProvider from "./_components/providers/evidence-provider";

export default function Home() {
  return (
    <EvidenceProvider>
      <main className="flex max-w-full grow flex-col items-center justify-between gap-8 overflow-y-auto sm:flex-col-reverse sm:justify-end">
        <GhostList></GhostList>
        <EvidencePicker></EvidencePicker>
      </main>
    </EvidenceProvider>
  );
}
