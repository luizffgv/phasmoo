"use client";

import { ModalContext } from "@/contexts/modal";
import { useEffect, useRef, useState } from "react";
import Card from "../card";
import Button from "../button";
import styles from "./modal-provider.module.css";

export interface Props {
  children?: React.ReactNode;
}

/** Provides a {@link ModalContext}. */
export default function ModalProvider({ children }: Props) {
  const [modal, setModal] = useState<React.ReactNode>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modal == null) return;

    if (dialogRef.current == null) throw new Error("dialogRef.current is null");

    dialogRef.current.showModal();
  }, [modal]);

  return (
    <>
      <ModalContext.Provider
        value={{
          setModal,
          modal,
        }}
      >
        {children}
      </ModalContext.Provider>
      {modal != null ? (
        <dialog
          ref={dialogRef}
          className={`${styles.modal} max-w-screen justify-safe-center fixed left-0 top-0 m-0 flex h-screen max-h-screen w-screen flex-col items-center gap-4 overflow-y-auto bg-stone-500/50 p-4 text-inherit dark:bg-stone-950/50`}
          onClose={() => setModal(null)}
        >
          <div className={styles.button}>
            <Button
              onClick={() => setModal(null)}
              aria-label="Close dialog"
              danger
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
              >
                <path d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" />
              </svg>
            </Button>
          </div>
          <div className={`${styles.card} max-h-full max-w-full `}>
            <Card className="max-h-full max-w-full overflow-y-auto">
              {modal}
            </Card>
          </div>
        </dialog>
      ) : (
        <></>
      )}
    </>
  );
}
