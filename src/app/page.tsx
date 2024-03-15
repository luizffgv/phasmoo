import EvidencePicker from "./_components/evidence-picker";
import GhostList from "./_components/ghost-list";
import EvidenceProvider from "./_components/providers/evidence-provider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-16 items-center p-24">
      <EvidenceProvider>
        <EvidencePicker></EvidencePicker>
        <GhostList></GhostList>
      </EvidenceProvider>
    </main>
  );
}
