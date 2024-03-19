import { createContext } from "react";

/** Context for showing a status in the page. */
export interface StatusContext {
  /** Status that is being shown. */
  readonly status: string | null;
  /**
   * Sets a new status.
   *
   * @param status - status to set.
   * @param duration - How long the status will last.
   */
  setStatus: (status: string | null, durationMs?: number) => void;
}

export const StatusContext = createContext<StatusContext>({
  status: null,
  setStatus: () => {},
});
