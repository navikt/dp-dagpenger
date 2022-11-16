import React from "react";
import { DateTimeFormatOptions } from "next-intl";

interface IProps {
  dato: string;
  short?: boolean;
}

export function FormattertDato(props: IProps) {
  const locale: string = "no-NO";

  const utvalg: DateTimeFormatOptions = {
    year: "numeric",
    month: props.short ? "2-digit" : "long",
    day: props.short ? "2-digit" : "numeric",
  };

  const formattertDato: string = new Date(props.dato).toLocaleDateString(
    locale,
    utvalg
  );

  return <>{formattertDato}</>;
}
