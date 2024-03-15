import { EvidenceID } from "@/lib/phasmo";
import EvidenceButton from "./evidence-button";
import Card from "./card";

export default function EvidencePicker() {
  return (
    <Card className="max-w-full">
      <div className="flex w-full flex-row gap-x-4 gap-y-2 overflow-x-auto rounded-xl sm:max-w-[512px] sm:flex-wrap">
        {EvidenceID.map((id) => (
          <EvidenceButton key={id} evidenceID={id}></EvidenceButton>
        ))}
      </div>
    </Card>
  );
}
