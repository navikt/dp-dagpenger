import { TypedObject } from "@portabletext/types";

export interface ISanityHelpText {
  title?: string;
  body: TypedObject | TypedObject[];
}

export interface ISanityAppText {
  textId: string;
  valueText: string;
}

export interface ISanityRichText {
  slug: string;
  body: TypedObject | TypedObject[];
}

export interface ISanityTexts {
  appTexts: ISanityAppText[];
  richTexts: ISanityRichText[];
}
