const appTextsFields = `{
  textId,
  valueText
}`;

const infoTextsFields = `{
  "slug": slug.current,
  body
}`;

export const appTextsGroq = `* [_type=="innsynAppText" && __i18n_lang==$baseLang]{
    ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${appTextsFields}, ${appTextsFields})
  }`;

const infoTextsGroq = `* [_type=="innsynRichText"  && __i18n_lang==$baseLang]{
  ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${infoTextsFields}, ${infoTextsFields})
  }`;

export const allTextsQuery = `{
  "appTexts": ${appTextsGroq},
  "richTexts": ${infoTextsGroq}
}`;
