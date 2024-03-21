import EvidenceCountPicker from "./_components/evidence-count-picker";
import EvidencePicker from "./_components/evidence-picker";
import GhostList from "./_components/ghost-list";
import EvidenceCountProvider from "./_components/providers/evidence-count-provider";
import EvidenceProvider from "./_components/providers/evidence-provider";
import ManualEnsurer from "./_components/manual-ensurer";
import GhostSpeedsProvider from "./_components/providers/ghost-speeds-provider";
import GhostSpeedsPicker from "./_components/ghost-speeds-picker";

export default function Home() {
  return (
    <>
      <ManualEnsurer></ManualEnsurer>
      <EvidenceProvider>
        <EvidenceCountProvider>
          <GhostSpeedsProvider>
            <main className="flex h-full max-w-full flex-col items-center justify-between gap-8 p-4 sm:h-auto sm:flex-col-reverse sm:justify-end">
              <div className="max-w-screen-xl grow overflow-y-auto rounded-2xl">
                <GhostList></GhostList>
              </div>
              <div className="flex max-w-full flex-col items-end gap-4 sm:items-center">
                <div className="flex w-full flex-row items-stretch gap-4 overflow-x-auto rounded-2xl sm:flex-wrap sm:justify-center">
                  <div className="max-w-full shrink-0 *:h-full sm:w-fit">
                    <EvidenceCountPicker></EvidenceCountPicker>
                  </div>
                  <div className="max-w-full shrink-0 *:h-full sm:w-fit">
                    <GhostSpeedsPicker></GhostSpeedsPicker>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <EvidencePicker></EvidencePicker>
                </div>
              </div>
            </main>
          </GhostSpeedsProvider>
        </EvidenceCountProvider>
      </EvidenceProvider>
    </>
  );
}
