import { ReactComponentLike } from "prop-types";
import React from "react";

export interface DokumentListeKnappProps {
  tekst: string;
  onClick?: (e?: any) => void;
  Ikon?: ReactComponentLike;
  disabled?: boolean;
}

export default function DokumentListeKnapp({
  onClick,
  tekst,
  Ikon,
  disabled,
}: DokumentListeKnappProps): JSX.Element {
  const buttonAttrs = {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyPress: onClick,
  };
  const additionalAttrs = disabled ? {} : buttonAttrs;

  return (
    <>
      <div
        {...additionalAttrs}
        className={`dp-knapp ${!disabled ? "aktiv" : ""}`}
      >
        {Ikon && (
          <div style={{ width: "24px", height: "24px" }}>
            <Ikon style={{ fontSize: "24px" }} />
          </div>
        )}
        <span
          className={`${Ikon ? "withIkon" : "withoutIkon"} ${
            !disabled ? "aktiv" : ""
          }`}
        >
          {tekst}
        </span>
      </div>
      <style jsx>
        {`
          .dp-knapp {
            padding-bottom: 10px;
            display: flex;
            align-items: flex-start;
            justify-content: left;
          }

          .dp-knapp.aktiv {
            color: #0067c5;
            align-items: center;
          }
          .dp-knapp.aktiv:hover {
            cursor: pointer;
          }
          span.aktiv:hover {
            text-decoration: underline;
          }
          .withIkon {
            margin-left: 10px;
          }
          .withoutIkon {
            margin-left: 34px;
          }
        `}
      </style>
    </>
  );
}
