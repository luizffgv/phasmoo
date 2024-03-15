/** IDs for all evidence types. */
export const EvidenceID = [
  "dots",
  "emf",
  "freezing",
  "orb",
  "writing",
  "box",
  "uv",
] as const;

/** One of the evidence IDs. */
export type EvidenceID = (typeof EvidenceID)[number];

/** A Phasmophobia ghost. */
export interface Ghost {
  /** Name of the ghost */
  name: string;
  /** Evidences the ghost has */
  evidences: EvidenceID[];
  /** Evidence that is always present */
  guaranteed?: EvidenceID;
  /**
   * Evidence that is guaranteed and isn't affected by the difficulty evidence
   * count, nor is it counted for difficulty purposes.
   */
  fake?: EvidenceID;
}

/** States an evidence can be in. */
export enum EvidenceState {
  /** Evidence is definitely present. */
  PRESENT,
  /** Evidence may or may not be present. */
  INDEFINITE,
  /** Evidence is definitely absent. */
  ABSENT,
}

/**
 * Maximum number of possible evidences, not considering difficulty or fake
 * evidences.
 */
const MAX_EVIDENCES = 3;

/** All ghosts in the game and their evidences. */
export const GHOSTS = [
  { name: "Spirit", evidences: ["emf", "box", "writing"] },
  { name: "Wraith", evidences: ["emf", "box", "dots"] },
  { name: "Phantom", evidences: ["box", "uv", "dots"] },
  { name: "Poltergeist", evidences: ["box", "uv", "writing"] },
  { name: "Banshee", evidences: ["uv", "orb", "dots"] },
  { name: "Jinn", evidences: ["emf", "uv", "freezing"] },
  { name: "Mare", evidences: ["box", "orb", "writing"] },
  { name: "Revenant", evidences: ["orb", "writing", "freezing"] },
  { name: "Shade", evidences: ["emf", "writing", "freezing"] },
  { name: "Demon", evidences: ["uv", "writing", "freezing"] },
  { name: "Yurei", evidences: ["orb", "freezing", "dots"] },
  { name: "Oni", evidences: ["emf", "freezing", "dots"] },
  { name: "Yokai", evidences: ["box", "orb", "dots"] },
  {
    name: "Hantu",
    evidences: ["uv", "orb", "freezing"],
    guaranteed: "freezing",
  },
  { name: "Goryo", evidences: ["emf", "uv", "dots"], guaranteed: "dots" },
  { name: "Myling", evidences: ["emf", "uv", "writing"] },
  { name: "Onryo", evidences: ["box", "orb", "freezing"] },
  { name: "The Twins", evidences: ["emf", "box", "freezing"] },
  { name: "Raiju", evidences: ["emf", "orb", "dots"] },
  { name: "Obake", evidences: ["emf", "uv", "orb"], guaranteed: "uv" },
  { name: "The Mimic", evidences: ["box", "uv", "freezing"], fake: "orb" },
  {
    name: "Moroi",
    evidences: ["box", "writing", "freezing"],
    guaranteed: "box",
  },
  { name: "Deogen", evidences: ["box", "writing", "dots"], guaranteed: "box" },
  { name: "Thaye", evidences: ["orb", "writing", "dots"] },
] as const satisfies Ghost[];

/** Labels for each {@link EvidenceID}. */
export const EvidenceLabels = {
  dots: "D.O.T.S Projector",
  emf: "EMF Level 5",
  uv: "Ultraviolet",
  freezing: "Freezing Temperatures",
  orb: "Ghost Orb",
  writing: "Ghost Writing",
  box: "Spirit Box",
} satisfies { [id in EvidenceID]: string };

/** Maps each evidence to a state. */
export type EvidenceStateMap = { [id in EvidenceID]: EvidenceState };

/**
 * Returns a filter callback for checking if the provided evidences discard a
 * ghost.
 *
 * @remarks
 * Adapted from https://github.com/luizffgv/spirit-box.
 *
 * @param evidences - Evidence information.
 * @param availableEvidences - Number of evidences the difficulty allows.
 * @returns `true` if the ghost is possible, `false` if discarded.
 */
export function filter(
  evidences: EvidenceStateMap,
  availableEvidences: 1 | 2 | 3
): (ghost: Ghost) => boolean {
  const present = Object.entries(evidences)
    .filter(([_, state]) => state == EvidenceState.PRESENT)
    .map(([id]) => id) as EvidenceID[];

  const absent = Object.entries(evidences)
    .filter(([_, state]) => state == EvidenceState.ABSENT)
    .map(([id]) => id) as EvidenceID[];

  return ({ evidences: ghostEvidences, fake, guaranteed }) => {
    const presentWithoutFake = present.filter((id) => id != fake);

    // Discard ghosts that don't have one or more of the found evidences,
    // ignoring fake evidences.
    for (const evidence of presentWithoutFake)
      if (!ghostEvidences.includes(evidence)) return false;

    // Discard ghosts that have more evidences than are possible to find,
    // ignoring fake evidences.
    if (presentWithoutFake.length > availableEvidences) return false;

    // Discard ghosts that more absent evidences than evidences disabled by
    // the difficulty.
    if (
      absent.filter((evidence) => ghostEvidences.includes(evidence)).length >
      MAX_EVIDENCES - availableEvidences
    )
      return false;

    // Discard ghosts whose guaranteed evidence is absent or unobtainable.
    if (guaranteed != null) {
      const isAbsent = evidences[guaranteed] == EvidenceState.ABSENT;
      const isPresent = evidences[guaranteed] == EvidenceState.PRESENT;
      const obtainableRemainingEvidences =
        availableEvidences -
        Object.values(evidences).filter(
          (found) => found == EvidenceState.PRESENT
        ).length;

      if (isAbsent || (!isPresent && obtainableRemainingEvidences < 1))
        return false;
    }

    // Discard ghosts whose fake evidence is absent, as it must be present.
    if (fake && absent.includes(fake)) return false;

    return true;
  };
}
