const appTextsFields = `{
  textId,
  valueText
}`;

export const innSynAppTextsQuery = `* [_type=="innsynApptekst" && __i18n_lang==$baseLang]{
    ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${appTextsFields}, ${appTextsFields})
  }`;
