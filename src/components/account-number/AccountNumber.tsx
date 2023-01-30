import { BodyLong, Heading } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import useSWR from "swr";
import { useSanity } from "../../context/sanity-context";
import api from "../../lib/api";
import { Konto } from "../../pages/api/konto";
import styles from "./AccountNumber.module.css";

export function AccountNumber() {
  const { data: konto } = useSWR<Konto>(api("konto"));
  const { getAppText, getRichText, getLink } = useSanity();

  function formatAccountNumber() {
    if (!konto?.kontonummer) {
      return;
    }

    const { kontonummer } = konto;

    if (kontonummer.length > 11) {
      return kontonummer;
    } else {
      return `${kontonummer.slice(0, 4)}.${kontonummer.slice(
        4,
        6
      )}.${kontonummer.slice(6, 12)}`;
    }
  }

  const hasAccountNumber = konto && konto.kontonummer;
  const updateAccountNumberLink = getLink("kontonummer.endre-kontonummeret");

  return (
    <>
      <Heading size="large">Utbetaling</Heading>
      <BodyLong className={styles.textContainer}>
        Hvis du får dagpenger, kommer pengene på konto noen få dager etter at du
        har sendt meldekortet. I svaret på søknaden vil det stå hvor mye du kan
        få utbetalt.
      </BodyLong>
      {hasAccountNumber && (
        <div className={styles.accountNumberContainer}>
          {getAppText("kontonummer.registrert-kontonummeret")}
          <div className={styles.accountNumber}>
            {formatAccountNumber()}
            <Link href={updateAccountNumberLink.linkUrl}>
              {updateAccountNumberLink.linkText}
            </Link>
          </div>
        </div>
      )}
      {!hasAccountNumber && (
        <PortableText value={getRichText("kontonummer.mangler-kontonummer")} />
      )}
    </>
  );
}
