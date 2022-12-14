import * as React from "react";
import BlockContent from "../lib/BlockContent";
import { useNotifikasjonContext } from "../lib/NotifikasjonProvider";
import { Alert, Heading } from "@navikt/ds-react";

export interface Notifikasjon {
  title?: string;
  innhold?: any[];
}

function Notifikasjoner() {
  const notifikasjoner = useNotifikasjonContext();

  if (!notifikasjoner?.length) {
    return null;
  }

  return (
    <div>
      {notifikasjoner.map((notifikasjon, i) => (
        <Alert variant="info" key={i}>
          <Heading level="2" size="xsmall" spacing>
            {notifikasjon.title}
          </Heading>
          {notifikasjon.innhold && (
            <BlockContent blocks={notifikasjon.innhold} />
          )}
        </Alert>
      ))}
    </div>
  );
}

export default Notifikasjoner;
