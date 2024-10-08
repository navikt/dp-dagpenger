import { TypedObject } from "@portabletext/types";
import { createContext, PropsWithChildren, useContext } from "react";
import { ISanity, ISanityLink } from "../types/sanity.types";
import { logger } from "@navikt/next-logger";

export const SanityContext = createContext<ISanity | undefined>(undefined);

interface IProps {
  initialState: ISanity;
}

export default function SanityProvider(props: PropsWithChildren<IProps>) {
  return (
    <SanityContext.Provider value={props.initialState}>{props.children}</SanityContext.Provider>
  );
}

function useSanity() {
  const context = useContext(SanityContext);

  if (context === undefined) {
    throw new Error("useSanity must be used within a SanityProvider");
  }

  function getAppText(textId: string): string {
    const appText =
      context?.appTexts?.find((appText) => appText.textId === textId)?.valueText || textId;

    if (!appText) {
      logger.error("Kunne ikke hente sanity tekster");
    }

    return appText;
  }

  function getSetting(settingId: string): string | undefined {
    return context?.settings?.find((setting) => setting.settingId === settingId)?.settingValue;
  }

  function getRichText(textId: string): TypedObject | TypedObject[] | undefined {
    const richText = context?.richTexts?.find((richText) => {
      return richText.textId === textId;
    });

    return richText?.body;
  }

  function getLink(linkId: string): ISanityLink {
    const link = context?.links?.find((link) => link.linkId === linkId) || {
      linkId: linkId,
      linkText: linkId,
      linkUrl: "",
      linkDescription: undefined,
    };

    if (!link) {
      logger.error("Kunne ikke hente sanity lenke");
    }

    return link;
  }

  return {
    getAppText,
    getRichText,
    getLink,
    getSetting,
  };
}

export { SanityProvider, useSanity };
