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

/** A speed a ghost moves in. */
export enum SpeedBits {
  SLOW = 0b1,
  NORMAL = 0b10,
  FAST = 0b100,
}

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
  /**
   * Normal walking speeds the ghost has, without seeing the player. This is a
   * bit field using {@link SpeedBits}.
   */
  speeds: number;
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
  {
    name: "Banshee",
    evidences: ["uv", "orb", "dots"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Demon",
    evidences: ["uv", "writing", "freezing"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Deogen",
    evidences: ["box", "writing", "dots"],
    guaranteed: "box",
    speeds: SpeedBits.SLOW | SpeedBits.FAST,
  },
  {
    name: "Goryo",
    evidences: ["emf", "uv", "dots"],
    guaranteed: "dots",
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Hantu",
    evidences: ["uv", "orb", "freezing"],
    guaranteed: "freezing",
    speeds: SpeedBits.SLOW | SpeedBits.NORMAL | SpeedBits.FAST,
  },
  {
    name: "Jinn",
    evidences: ["emf", "uv", "freezing"],
    speeds: SpeedBits.NORMAL | SpeedBits.FAST,
  },
  {
    name: "Mare",
    evidences: ["box", "orb", "writing"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Moroi",
    evidences: ["box", "writing", "freezing"],
    guaranteed: "box",
    speeds: SpeedBits.SLOW | SpeedBits.NORMAL | SpeedBits.FAST,
  },
  {
    name: "Myling",
    evidences: ["emf", "uv", "writing"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Obake",
    evidences: ["emf", "uv", "orb"],
    guaranteed: "uv",
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Oni",
    evidences: ["emf", "freezing", "dots"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Onryo",
    evidences: ["box", "orb", "freezing"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Phantom",
    evidences: ["box", "uv", "dots"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Poltergeist",
    evidences: ["box", "uv", "writing"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Raiju",
    evidences: ["emf", "orb", "dots"],
    speeds: SpeedBits.NORMAL | SpeedBits.FAST,
  },
  {
    name: "Revenant",
    evidences: ["orb", "writing", "freezing"],
    speeds: SpeedBits.SLOW,
  },
  {
    name: "Shade",
    evidences: ["emf", "writing", "freezing"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Spirit",
    evidences: ["emf", "box", "writing"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Thaye",
    evidences: ["orb", "writing", "dots"],
    speeds: SpeedBits.SLOW | SpeedBits.NORMAL | SpeedBits.FAST,
  },
  {
    name: "The Mimic",
    evidences: ["box", "uv", "freezing"],
    fake: "orb",
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "The Twins",
    evidences: ["emf", "box", "freezing"],
    speeds: SpeedBits.SLOW | SpeedBits.FAST,
  },
  {
    name: "Wraith",
    evidences: ["emf", "box", "dots"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Yokai",
    evidences: ["box", "orb", "dots"],
    speeds: SpeedBits.NORMAL,
  },
  {
    name: "Yurei",
    evidences: ["orb", "freezing", "dots"],
    speeds: SpeedBits.NORMAL,
  },
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
export function evidenceFilter(
  evidences: EvidenceStateMap,
  availableEvidences: 1 | 2 | 3,
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
          (found) => found == EvidenceState.PRESENT,
        ).length;

      if (isAbsent || (!isPresent && obtainableRemainingEvidences < 1))
        return false;
    }

    // Discard ghosts whose fake evidence is absent, as it must be present.
    if (fake && absent.includes(fake)) return false;

    return true;
  };
}

/**
 * Returns a filter callback for checking if the provided speeds discard a
 * ghost.
 *
 * @param speeds - Speeds presented, use {@link SpeedBits}.
 */
export function speedFilter(speeds: number): (ghost: Ghost) => boolean {
  return (ghost) => (ghost.speeds & speeds) == speeds;
}
