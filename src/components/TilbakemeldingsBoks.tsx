import { Element, Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";

export const TilbakemeldingsBoks = () => {
  const triggerHotJar = () =>
    (window as any).hj("trigger", "trigger-generelltilbakemelding");

  return (
    <div className="tilbakemelding-wrapper">
      <AlertStripeInfo>
        <Element>Har du tilbakemeldinger til denne siden?</Element>

        <Normaltekst style={{ marginBottom: "15px", marginTop: "15px" }}>
          Dette er en ny versjon av... og vi trenger dine innspill på om noe
          mangler, er feil eller er vanskelig å forstå. Vi setter pris på om du
          tar deg tid til å gi oss innspill hvis du har noen.
        </Normaltekst>

        <div
          role="button"
          className="tilbakemelding_knapp"
          onClick={triggerHotJar}
          onKeyPress={triggerHotJar}
          tabIndex={0}
        >
          Gi oss tilbakemelding
        </div>
      </AlertStripeInfo>
      <style jsx>
        {`
          .tilbakemelding_knapp {
            color: #0067c5;
            text-decoration: underline;
            cursor: pointer;
          }
          .tilbakemelding-wrapper {
            margin-top: 2rem;
          }
        `}
      </style>
    </div>
  );
};
