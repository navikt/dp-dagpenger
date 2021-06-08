import Veilederpanel from "nav-frontend-veilederpanel";
import React, { CSSProperties, ReactNode } from "react";
import { Systemtittel, Undertekst } from "nav-frontend-typografi";
interface SeksjonProps {
  iconSvg: ReactNode;
  tittel: string;
  undertittel?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Seksjon = (props: SeksjonProps) => {
  return (
    <div className="seksjon-wrapper" style={props.style}>
      <Veilederpanel svg={props.iconSvg} type={"plakat"} kompakt>
        <div className="tittel-container">
          <Systemtittel style={{ marginBottom: "10px" }}>
            {props.tittel}
          </Systemtittel>
          {props.undertittel && <Undertekst>{props.undertittel}</Undertekst>}
        </div>
        {props.children}
      </Veilederpanel>
      <style jsx>{`
        .seksjon-wrapper {
          display: block;
          margin-top: 105px;
          margin-bottom: 10px;
        }
        .tittel-container {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};
