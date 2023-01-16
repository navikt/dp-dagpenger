import useSWR from "swr";
import React from "react";
import api from "../../lib/api";
import { BodyLong } from "@navikt/ds-react";
import Link from "next/link";
import { Konto } from "../../pages/api/konto";

export const Kontonummer = () => {
  const { data: konto } = useSWR<Konto>(api("konto"));

  const formatterKontonummer = () => {
    if (!konto?.kontonummer) {
      return;
    }

    const { kontonummer } = konto;

    if (kontonummer.length > 11) {
      return kontonummer;
    } else {
      return `${kontonummer.slice(0, 4)} ${kontonummer.slice(
        4,
        6
      )} ${kontonummer.slice(6, 12)}`;
    }
  };

  const kontoUrl =
    "https://www.nav.no/person/personopplysninger/nb/#utbetaling";
  const harKontonummer = konto && konto.kontonummer;

  return (
    <BodyLong spacing>
      {harKontonummer && (
        <>
          Du har registrert dette kontonummeret hos NAV:{" "}
          {formatterKontonummer()}.{" "}
          <Link href={kontoUrl}>Endre kontonummer</Link>
        </>
      )}

      {!harKontonummer && (
        <>
          Husk å <Link href={kontoUrl}>kontrollere kontonummeret</Link> som er
          registrert hos NAV.
        </>
      )}
    </BodyLong>
  );
};
