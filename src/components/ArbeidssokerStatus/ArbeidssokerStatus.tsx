import useSWR from "swr";
import { useSanity } from "../../context/sanity-context";
import { Alert } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import styles from "./ArbeidssokerStatus.module.css";

export function ArbeidssokerStatus() {
  const { data: registrering, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/arbeidssoker/perioder`
  );

  const { getRichText } = useSanity();

  const isRegistertedText = getRichText(
    "rik-tekst.arbeidssokers-status.er-registrert"
  );
  const isNotRegistertedText = getRichText(
    "rik-tekst.arbeidssokers-status.er-ikke-registrert"
  );
  const errorGettingRegisterStatusText = getRichText(
    "rik-tekst.arbeidssokers-status.fant-ikke-svaret"
  );

  if (registrering === undefined && !error) return null;

  if (error || typeof registrering.arbeidssokerperioder === "undefined") {
    return <PortableText value={errorGettingRegisterStatusText} />;
  }

  const isRegistered = registrering.arbeidssokerperioder.length;

  if (!isRegistered) {
    return (
      <div className={styles.arbeidssokerStatusContainer}>
        <Alert variant="warning">
          <PortableText value={isNotRegistertedText} />
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.arbeidssokerStatusContainer}>
      <PortableText value={isRegistertedText} />
    </div>
  );
}
