import Veilederpanel from "nav-frontend-veilederpanel";
import React, { CSSProperties, ReactNode } from "react";
import { Systemtittel, Undertekst } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";

interface SeksjonProps {
  id?: string;
  iconSvg?: ReactNode;
  tittel: string;
  undertittel?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Seksjon = (props: SeksjonProps) => {
  const ValgtPanel = props.iconSvg
    ? ({ children }) => (
        <Veilederpanel svg={props.iconSvg} type={"plakat"} kompakt>
          {children}
        </Veilederpanel>
      )
    : ({ children }) => (
        <Panel style={{ borderRadius: "9px", padding: "2rem" }}>
          {children}
        </Panel>
      );
  return (
    <div
      id={props.id}
      className={`seksjon-wrapper ${props.iconSvg ? "med-ikon" : ""}`}
      style={props.style}
    >
      <ValgtPanel>
        <div className="tittel-container">
          <Systemtittel style={{ marginBottom: "10px" }}>
            {props.tittel}
          </Systemtittel>
          {props.undertittel && <Undertekst>{props.undertittel}</Undertekst>}
        </div>
        {props.children}
      </ValgtPanel>
      <style jsx>{`
        .seksjon-wrapper {
          display: block;
          margin-top: 2rem;
          margin-bottom: 10px;
        }
        .med-ikon {
          margin-top: 105px;
        }
        .tittel-container {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};
