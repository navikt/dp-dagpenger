import useSWR from "swr";
import React from "react";

export const Kontonummer = () => {
  const { data: personalia, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_PATH}/api/personalia`
  );

  if (!personalia && !error) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      Ditt kontonummer er {personalia.kontonr}
    </div>
  );
};
