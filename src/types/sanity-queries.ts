const appTextsFields = `{
  textId,
  valueText
}`;

const infoTextsFields = `{
  "slug": slug.current,
  body
}`;

export const appTextsGroq = `* [_type=="innsynApptekst" && __i18n_lang==$baseLang]{
    ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${appTextsFields}, ${appTextsFields})
  }`;

const infoTextsGroq = `* [_type=="innsynInfotekst"  && __i18n_lang==$baseLang]{
  ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${infoTextsFields}, ${infoTextsFields})
  }`;

export const allTextsQuery = `{
  "apptekster": ${appTextsGroq},
  "infotekster": ${infoTextsGroq}
}`;
