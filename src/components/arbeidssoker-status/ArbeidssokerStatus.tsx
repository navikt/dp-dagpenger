import useSWR from "swr";
import { useSanity } from "../../context/sanity-context";
import { Alert } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import styles from "./ArbeidssokerStatus.module.css";

export function ArbeidssokerStatus() {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_PATH}/arbeidssoker/perioder`);

  const { getRichText } = useSanity();

  if (error) {
    return <PortableText value={getRichText("arbeidssokers-status.fant-ikke-svaret")} />;
  }

  const unregistered = data?.findIndex((periode) => periode.avsluttet === null) === -1;

  if (unregistered) {
    return (
      <div className={styles.arbeidssokerStatusContainer}>
        <Alert variant="warning" className={styles.arbeidssokerStatusNotRegisteredAlertBox}>
          <PortableText value={getRichText("arbeidssokers-status.er-ikke-registrert")} />
        </Alert>
      </div>
    );
  }

  return (
    <div className={styles.arbeidssokerStatusContainer}>
      <PortableText value={getRichText("arbeidssokers-status.er-registrert")} />
    </div>
  );
}
