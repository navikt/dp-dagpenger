import { BodyLong } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import useSWR from "swr";
import { useSanity } from "../../context/sanity-context";
import api from "../../lib/api";
import { Konto } from "../../pages/api/konto";

export function AccountNumber() {
  const { data: konto } = useSWR<Konto>(api("konto"));
  const { getAppText, getRichText } = useSanity();

  function formatAccountNumber() {
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
  }

  const hasAccountNumber = konto && konto.kontonummer;
  const accountNumberMissingInfoText = getRichText(
    "rik-tekst.kontonummer.mangler-kontonummer"
  );

  return (
    <div data-testid="account-number">
      <BodyLong spacing>
        {hasAccountNumber && (
          <>
            {getAppText("tekst.kontonummer.registrert-kontonummeret")}{" "}
            {formatAccountNumber()}
            {". "}
            <Link href={getAppText("tekst.kontonummer.konto-url")}>
              {getAppText("tekst.kontonummer.endre-kontonummer.lenke-tekst")}
            </Link>
          </>
        )}
      </BodyLong>
      {!hasAccountNumber && (
        <PortableText value={accountNumberMissingInfoText} />
      )}
    </div>
  );
}
