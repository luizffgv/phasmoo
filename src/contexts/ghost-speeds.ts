import { Ghost, SpeedBits } from "@/lib/phasmo";
import { createContext } from "react";

/**
 * A context for speeds that a ghost presents without line of sight of the
 * player.
 */
export interface GhostSpeedsContext {
  /** A number with {@link SpeedBits} representing the speeds. */
  readonly speeds: number;
  /** A filter for ghosts based on the context speeds. */
  readonly speedFilter: (ghost: Ghost) => boolean;
  /** Sets the presence of a speed (whether it is surely present). */
  setSpeed(speed: SpeedBits, present: boolean): void;
}

export const GhostSpeedsContext = createContext<GhostSpeedsContext>({
  speeds: 0,
  speedFilter: () => true,
  setSpeed: () => {},
});
