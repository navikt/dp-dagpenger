import useSWR from "swr";
import { useSanity } from "../../context/sanity-context";
import { Alert, Skeleton } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import styles from "./ArbeidssokerStatus.module.css";

export function ArbeidssokerStatus() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/arbeidssoker/perioder`,
  );

  const registered = data?.findIndex((periode) => periode.avsluttet === null) !== -1;
  const { getRichText } = useSanity();

  if (isLoading) {
    return (
      <div style={{ fontSize: "7rem" }}>
        <Skeleton variant="text" width="100%" />
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <Alert variant="warning" className={styles.arbeidssokerStatusNotRegisteredAlertBox}>
        <PortableText value={getRichText("arbeidssokers-status.teknisk-feil")} />
      </Alert>
    );
  }

  if (!isLoading && !error && !registered) {
    return (
      <Alert variant="warning" className={styles.arbeidssokerStatusNotRegisteredAlertBox}>
        <PortableText value={getRichText("arbeidssokers-status.er-ikke-registrert")} />
      </Alert>
    );
  }

  // Midlertidig feilmeling på grunn av teknisk feil i arbeidssøkerstaatus
  return (
    <div className={styles.arbeidssokerStatusContainer}>
      {/* <PortableText value={getRichText("arbeidssokers-status.er-registrert")} /> */}
      <PortableText value={getRichText("arbeidssokers-status.teknisk-feil")} />
    </div>
  );
}
