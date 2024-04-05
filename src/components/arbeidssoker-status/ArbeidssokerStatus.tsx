import useSWR from "swr";
import { useSanity } from "../../context/sanity-context";
import { Alert } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import styles from "./ArbeidssokerStatus.module.css";

export function ArbeidssokerStatus() {
  const { data: registrering, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/arbeidssoker/perioder`,
  );

  const { getRichText } = useSanity();

  if (registrering === undefined && !error) {
    return null;
  }

  if (error || typeof registrering.arbeidssokerperioder === "undefined") {
    return <PortableText value={getRichText("arbeidssokers-status.fant-ikke-svaret")} />;
  }

  const isRegistered = registrering.arbeidssokerperioder.length;

  if (!isRegistered) {
    return (
      <div className={styles.arbeidssokerStatusContainer}>
        <Alert variant="warning" className={styles.arbeidssokerStatusNotRegisteredAlertBox}>
          <PortableText value={getRichText("arbeidssokers-status.er-ikke-registrert")} />
        </Alert>
      </div>
    );
  }
}
