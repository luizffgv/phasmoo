import { type Ghost } from "@/lib/phasmo";
import Card from "./card";
import styles from "./ghost-list.module.css";
import EvidenceIcon from "./evidence-icon";

export interface Props {
  ghost: Ghost;
}

export default function Ghost({ ghost }: Props) {
  return (
    <Card className={`max-w-[384px] grow ${styles.card}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="text-center text-lg font-bold">{ghost.name}</div>
        <div className="flex flex-row gap-4">
          {ghost.evidences
            .filter((evidence) => evidence != ghost.guaranteed)
            .map((id) => (
              <div key={id}>
                <EvidenceIcon evidence={id}></EvidenceIcon>
              </div>
            ))}
        </div>
        {ghost.fake ? (
          <div className="flex flex-row items-center gap-2">
            <EvidenceIcon evidence={ghost.fake}></EvidenceIcon>
            <small>(fake)</small>
          </div>
        ) : (
          <></>
        )}
        {ghost.guaranteed ? (
          <div className="flex flex-row items-center gap-2">
            <EvidenceIcon evidence={ghost.guaranteed}></EvidenceIcon>
            <small>(guaranteed)</small>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
}
