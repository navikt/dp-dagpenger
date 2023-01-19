import React from "react";
import { DateTimeFormatOptions } from "next-intl";

interface IProps {
  date: string;
  shortDate?: boolean;
}

export function FormattedDate({ date, shortDate }: IProps) {
  const locale = "no-NO";

  const datoutvalg: DateTimeFormatOptions = {
    year: "numeric",
    month: shortDate ? "2-digit" : "long",
    day: shortDate ? "2-digit" : "numeric",
  };

  const formattertDato: string = new Date(date).toLocaleDateString(
    locale,
    datoutvalg
  );

  const tidsutvalg: DateTimeFormatOptions = {
    timeStyle: "short",
  };

  const formattertTidspunkt: string = new Date(date).toLocaleTimeString(
    locale,
    tidsutvalg
  );

  return (
    <>
      {formattertDato} - {formattertTidspunkt}
    </>
  );
}
