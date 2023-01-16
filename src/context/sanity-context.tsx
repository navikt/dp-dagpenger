import { createContext, PropsWithChildren, useContext } from "react";
import { ISanityAppTekst } from "../types/sanity.types";

export const SanityContext = createContext<ISanityAppTekst[] | undefined>(
  undefined
);

interface IProps {
  initialState: ISanityAppTekst[];
}

export default function SanityProvider(props: PropsWithChildren<IProps>) {
  return (
    <SanityContext.Provider value={props.initialState}>
      {props.children}
    </SanityContext.Provider>
  );
}

function useSanity() {
  const context = useContext(SanityContext);

  if (context === undefined) {
    throw new Error("useSanity must be used within a SanityProvider");
  }

  function getAppText(textId: string): string {
    const text =
      context.find((apptekst) => apptekst.textId === textId)?.valueText ||
      textId;

    if (!text) {
      console.error("Kunne ikke hente sanity tekster");
    }

    return text;
  }

  return {
    getAppText,
  };
}

export { SanityProvider, useSanity };
