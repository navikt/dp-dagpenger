import { Button, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NoSessionError } from "../../svg-icons/NoSessionError";
import { useSession } from "../../util/session.util";
import styles from "./NoSessionModal.module.css";

export function NoSessionModal() {
  const router = useRouter();
  const { session, isLoading, isError } = useSession();
  const [timeLeft, setTimeLeft] = useState<number | undefined>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }

    if (!process.env.NEXT_PUBLIC_LOCALHOST) {
      if (isLoading) return;

      if (!session || isError) {
        setTimeLeft(1);
        setModalOpen(true);
      }

      if (session?.expiresIn) {
        setTimeLeft(session?.expiresIn);
      }
    }
  }, [session, isLoading, isError]);

  useEffect(() => {
    if (!timeLeft) return;

    if (timeLeft === 1) {
      setModalOpen(true);
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function login() {
    window.location.reload();
  }

  return (
    <Modal
      className="modal-container modal-container--error"
      onClose={() => {
        return;
      }}
      open={modalOpen}
      closeButton={false}
      shouldCloseOnOverlayClick={false}
    >
      <Modal.Content>
        <div className={styles.iconContainer}>
          <NoSessionError />
        </div>
        <Heading size={"medium"} spacing>
          Du må logge inn på nytt for å fortsette
        </Heading>
        <p>
          Sesjonen din har utløpt, og du må logge inn med BankID på nytt for å
          fortsette. Alle svarene dine i søknaden er lagret og du kan fortsette
          der du slapp.
        </p>
        <div className={styles.actionButtonsContainer}>
          <Button variant={"primary"} onClick={login}>
            Logg inn på nytt
          </Button>
          <Button
            variant={"tertiary"}
            onClick={() => router.push("https://nav.no/")}
          >
            Gå til forsiden
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
