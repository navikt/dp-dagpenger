import React from "react";
import { DateTimeFormatOptions } from "next-intl";

interface IProps {
  dato: string;
  kortDato?: boolean;
}

export function FormattertDato(props: IProps) {
  const locale = "no-NO";

  const datoutvalg: DateTimeFormatOptions = {
    year: "numeric",
    month: props.kortDato ? "2-digit" : "long",
    day: props.kortDato ? "2-digit" : "numeric",
  };

  const formattertDato: string = new Date(props.dato).toLocaleDateString(
    locale,
    datoutvalg
  );

  const tidsutvalg: DateTimeFormatOptions = {
    timeStyle: "short",
  };

  const formattertTidspunkt: string = new Date(props.dato).toLocaleTimeString(
    locale,
    tidsutvalg
  );

  return (
    <>
      {formattertDato} - {formattertTidspunkt}
    </>
  );
}
