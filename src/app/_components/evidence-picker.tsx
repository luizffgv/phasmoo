import { EvidenceID } from "@/lib/phasmo";
import EvidenceButton from "./evidence-button";
import Card from "./card";

export default function EvidencePicker() {
  return (
    <Card>
      <div className="w-full flex flex-row sm:flex-wrap gap-x-4 gap-y-2 overflow-x-auto">
        {EvidenceID.map((id) => (
          <EvidenceButton key={id} evidenceID={id}></EvidenceButton>
        ))}
      </div>
    </Card>
  );
}
