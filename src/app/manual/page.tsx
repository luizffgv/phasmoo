import { EvidenceID, EvidenceLabels } from "@/lib/phasmo";
import EvidenceIcon from "../_components/evidence-icon";
import EvidenceButton from "../_components/evidence-button";
import Section from "./_components/section";
import EvidenceStateLabel from "./_components/evidence-state-label";
import EvidenceProvider from "../_components/providers/evidence-provider";
import Card from "../_components/card";
import ManualReadSetter from "./_components/manual-read-setter";
import EvidencePicker from "../_components/evidence-picker";
import GhostsProvider from "../_components/providers/ghosts-provider";
import GhostList from "../_components/ghost-list";
import EvidenceCountProvider from "../_components/providers/evidence-count-provider";
import EvidenceCountPicker from "../_components/evidence-count-picker";
import Button from "../_components/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phasmoo Manual",
  description: "Learn how Phasmoo works here.",
};

export default function Page() {
  return (
    <div className="p-4 pb-[25vh]">
      <ManualReadSetter></ManualReadSetter>
      <div className="flex flex-row justify-center">
        <div className="flex max-w-prose flex-col">
          <Section title="What is Phasmoo?" level={2}>
            <p>
              Phasmoo is a Phasmophobia journal. You provide the evidences you
              find, and Phasmoo provides the list of possible ghosts.
            </p>
          </Section>
          <Section title="Evidences" level={2}>
            <Section title="Icons" level={3}>
              <p>Each evidence is represented by an icon as follows:</p>
              <ul className="flex flex-col gap-4">
                {EvidenceID.map((id) => (
                  <li key={id} className="flex flex-row gap-4">
                    <EvidenceIcon evidence={id} useCurrentColor></EvidenceIcon>
                    <span>{EvidenceLabels[id]}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="States" level={3}>
              <p>
                Evidences can be either <strong>present</strong>{" "}
                <small>(evidence you found)</small>, <strong>absent</strong>{" "}
                <small>(evidence that is surely not present)</small>, or{" "}
                <strong>indefinite</strong> <small>(you&apos;re unsure)</small>.
              </p>
              <p>
                You can click the following evidence button to set its state.
                Use it to learn what each color means.
              </p>
              <EvidenceProvider>
                <Card className="flex w-fit flex-row items-center gap-4">
                  <div>
                    <EvidenceButton evidenceID="emf"></EvidenceButton>
                  </div>
                  <span className="text-lg font-bold">=</span>
                  <EvidenceStateLabel evidence="emf"></EvidenceStateLabel>
                </Card>
              </EvidenceProvider>
              <p>
                There may be colored borders around evidence buttons. Don&apos;t
                worry, it will be explained.
              </p>
            </Section>
            <Section title="Difficulties" level={3}>
              You can tell Phasmoo how many evidences the difficulty you&apos;re
              playing allows. Try it below.
              <EvidenceCountProvider>
                <EvidenceCountPicker></EvidenceCountPicker>
              </EvidenceCountProvider>
            </Section>
          </Section>
          <Section title="Ghosts" level={2}>
            <p>
              A ghost has 3 main evidences. If you play with 3 evidences, any of
              them being absent will filter out the ghost. If you play with a
              reduced evidence count, the ghost can have one absent evidence for
              each evidence that was removed.
            </p>
            <p>
              Check the example ghost below and try combinations of evidences to
              see what discards it. Pay attention to how the available evidence
              count affects how many of the ghost&apos;s evidences can be
              absent.
            </p>
            <GhostsProvider
              ghosts={[
                { name: "Example ghost", evidences: ["emf", "box", "dots"] },
              ]}
            >
              <EvidenceProvider>
                <EvidenceCountProvider>
                  <div className="flex flex-col items-center gap-4">
                    <EvidenceCountPicker></EvidenceCountPicker>
                    <EvidencePicker></EvidencePicker>
                  </div>
                  <div className="min-h-32">
                    <GhostList></GhostList>
                  </div>
                </EvidenceCountProvider>
              </EvidenceProvider>
            </GhostsProvider>
            <Section title="Special evidences" level={3}>
              <p>
                A ghost can also have <strong>fake</strong> and{" "}
                <strong>guaranteed</strong> evidences.
              </p>
              <p>
                A guaranteed evidence is one of the ghost&apos;s 3 main
                evidences, it&apos;s always present for that ghost as long as
                there&apos;s at least one evidence available.
              </p>
              <p>
                Fake evidences are guaranteed even when playing with zero
                evidences, and are extra evidences&mdash;not part of the 3 main
                evidences.
              </p>
            </Section>
          </Section>
          <Section title="Hints" level={2}>
            <p>
              Phasmoo will give you hints if the current evidences force an
              indefinite evidence to be present or absent. This is represented
              by a border around the evidence button.
            </p>
            <p>
              A border with the <strong>absent</strong> color means the evidence
              is surely absent, while a border with the <strong>present</strong>{" "}
              color means the evidence is surely present.
            </p>
            <p>Check the example below.</p>
            <GhostsProvider
              ghosts={[
                { name: "Ghost A", evidences: ["emf", "box", "dots"] },
                { name: "Ghost B", evidences: ["emf", "box", "orb"] },
              ]}
            >
              <EvidenceProvider>
                <EvidencePicker></EvidencePicker>
                <div className="min-h-32">
                  <GhostList></GhostList>
                </div>
              </EvidenceProvider>
            </GhostsProvider>
            <p>
              Since none of the available ghosts have freezing temperatures,
              ghost writing or UV evidences, it&apos;s impossible for them to be
              present, so there&apos;s a hint around their respective buttons.
            </p>
            <p>
              EMF and Spirit Box are present in both ghosts, so they are
              guaranteed to be present. Phasmoo also provides hints for them.
            </p>
            <p>
              The ghost list still respects only the evidence information you
              explicitly provide.
            </p>
          </Section>
          <Section title="You're ready to use Phasmoo!" level={2}>
            <div className="w-fit">
              <Button href="/">Let&apos;s go!</Button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
