import { TypedObject } from "@portabletext/types";

export interface ISanityHelpText {
  title?: string;
  body: TypedObject | TypedObject[];
}

export interface ISanityAppTekst {
  textId: string;
  valueText: string;
}

export interface ISanityInfoTekst {
  slug: string;
  body: TypedObject | TypedObject[];
}

export interface ISanityTexts {
  infotekster: ISanityInfoTekst[];
  apptekster: ISanityAppTekst[];
}
