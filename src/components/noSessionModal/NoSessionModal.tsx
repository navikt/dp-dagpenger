import { Button, Heading, Modal } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { NoSessionError } from "../../svg-icons/NoSessionError";
import { useSession } from "../../util/session.util";
import styles from "./NoSessionModal.module.css";

export function NoSessionModal() {
  const router = useRouter();
  const { getAppText } = useSanity();
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
          {getAppText("utlopt-sessjon.modal.tittel")}
        </Heading>
        <p>{getAppText("utlopt-sessjon.modal.detaljer")}</p>
        <div className={styles.actionButtonsContainer}>
          <Button variant={"primary"} onClick={login}>
            {getAppText("utlopt-sessjon.modal.knapp.logg-inn")}
          </Button>
          <Button
            variant={"tertiary"}
            onClick={() => router.push("https://nav.no/")}
          >
            {getAppText("utlopt-sessjon.modal.knapp.tilbake")}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
}
