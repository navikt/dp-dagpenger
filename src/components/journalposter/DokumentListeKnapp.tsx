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
  type PropWithChildren = {
    children: React.ReactNode;
  };
  const DisabledWrapper = ({ children }: PropWithChildren): JSX.Element => {
    return (
      <>
        <div className={`dp-knapp ${Ikon ? "withIkon" : "withoutIkon"}`}>
          {children}
        </div>
        <style jsx>
          {`
            .dp-knapp {
              padding: 5px 0;
              display: flex;
              align-items: flex-start;
              justify-content: left;
            }
          `}
        </style>
      </>
    );
  };

  const ButtonWrapper = ({ children }: PropWithChildren): JSX.Element => {
    return (
      <>
        <div
          tabIndex={0}
          role="button"
          onClick={onClick}
          onKeyPress={onClick}
          className={"dp-knapp aktiv"}
        >
          {children}
        </div>
        <style jsx>
          {`
            .dp-knapp {
              padding: 5px 0;
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
          `}
        </style>
      </>
    );
  };

  const Wrapper = disabled ? DisabledWrapper : ButtonWrapper;

  return (
    <>
      <Wrapper>
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
      </Wrapper>
      <style jsx>
        {`
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
