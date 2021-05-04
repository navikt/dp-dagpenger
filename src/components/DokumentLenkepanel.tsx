import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Files } from "@navikt/ds-icons";
import React from "react";

export const DokumentLenkepanel = () => {
  return (
    <LenkepanelBase
      href="https://tjenester.nav.no/saksoversikt/tema/DAG"
      border
    >
      <div className="container">
        <Files style={{ fontSize: "52px" }} />
        <div className="textContainer">
          <Undertittel className="lenkepanel__heading">
            Se alle dine dokumenter for dagpenger og oppfølging
          </Undertittel>
          <Normaltekst>Vedtaksbrev, vedlegg, samtalereferater m.m.</Normaltekst>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          padding: 1rem;
        }
        .textContainer {
          margin-left: 23px;
        }
        .textContainer p {
          margin: 0;
        }
      `}</style>
    </LenkepanelBase>
  );
};
