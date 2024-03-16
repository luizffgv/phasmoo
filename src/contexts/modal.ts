import { ReactNode, createContext } from "react";

export interface ModalContext {
  modal: ReactNode;
  setModal(modal: ReactNode): void;
}

export const ModalContext = createContext<ModalContext>({
  modal: null,
  setModal: () => {},
});
