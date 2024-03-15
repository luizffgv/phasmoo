import { EvidenceLabels, Ghost } from "@/lib/phasmo";
import Card from "./card";

export interface Props {
  ghost: Ghost;
}

export default function Ghost({ ghost }: Props) {
  return (
    <Card>
      <div className="text-center text-xl font-bold">{ghost.name}</div>
      {ghost.evidences.map((id) => (
        <div key={id}>{EvidenceLabels[id]}</div>
      ))}
      {ghost.fake ? (
        <div>
          <span className="text-red-400">{EvidenceLabels[ghost.fake]}</span>{" "}
          <small>(fake)</small>
        </div>
      ) : (
        <></>
      )}
      {ghost.guaranteed ? (
        <div>
          <span className="text-emerald-400">
            {EvidenceLabels[ghost.guaranteed]}
          </span>{" "}
          <small>(guaranteed)</small>
        </div>
      ) : (
        <></>
      )}
    </Card>
  );
}
