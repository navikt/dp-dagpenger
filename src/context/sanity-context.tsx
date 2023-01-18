import { TypedObject } from "@portabletext/types";
import { PropsWithChildren, createContext, useContext } from "react";
import { ISanityTexts } from "../types/sanity.types";

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
      context?.appTexts?.find((appText) => appText.textId === textId)
        ?.valueText || textId;

    if (!appText) {
      console.error("Kunne ikke hente sanity tekster");
    }

    return appText;
  }

  function getRichText(slug: string): TypedObject | TypedObject[] | undefined {
    const richText = context?.richTexts?.find((richText) => {
      return richText.slug === slug;
    });

    return richText.body;
  }

  return {
    getAppText,
    getRichText,
  };
}

export { SanityProvider, useSanity };
