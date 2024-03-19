import { GHOSTS, Ghost } from "@/lib/phasmo";
import { createContext } from "react";

interface GhostsContext {
  readonly ghosts: Readonly<Ghost[]>;
}

export const GhostsContext = createContext<GhostsContext>({
  ghosts: GHOSTS,
});
