import { createContext, PropsWithChildren, useContext } from "react";
import {
  ISanityInfoTekst as ISanityInfoTexts,
  ISanityTexts,
} from "../types/sanity.types";

export const SanityContext = createContext<ISanityTexts | undefined>(undefined);

interface IProps {
  initialState: ISanityTexts;
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
    const appText =
      context?.apptekster?.find((apptekst) => apptekst.textId === textId)
        ?.valueText || textId;

    if (!appText) {
      console.error("Kunne ikke hente sanity tekster");
    }

    return appText;
  }

  function getInfoText(slug: string): ISanityInfoTexts | undefined {
    return context?.infotekster?.find((infotekst) => {
      return infotekst.slug === slug;
    });
  }

  return {
    getAppText,
    getInfoText,
  };
}

export { SanityProvider, useSanity };
