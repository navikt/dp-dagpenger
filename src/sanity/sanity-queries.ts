const appTextFields = `{
  textId,
  valueText
}`;

const settingFields = `{
  settingId,
  settingValue,
}`;

const infoTextsFields = `{
  "slug": slug.current,
  body
}`;

const linkFields = `{
  linkId,
  linkText,
  linkUrl,
  linkDescription
}`;

export const appTextsGroq = `* [_type=="mineDagpengerAppText" && __i18n_lang==$baseLang]{
    ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${appTextFields}, ${appTextFields})
  }`;

const infoTextsGroq = `* [_type=="mineDagpengerRichText"  && __i18n_lang==$baseLang]{
  ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${infoTextsFields}, ${infoTextsFields})
  }`;

const linksGroq = `* [_type=="mineDagpengerLink"  && __i18n_lang==$baseLang]{
  ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${linkFields}, ${linkFields})
  }`;

const settingsGroq = `* [_type=="mineDagpengerSetting"  && __i18n_lang==$baseLang]{
  ...coalesce(* [_id==^._id + "__i18n_" + $lang][0]${settingFields}, ${settingFields})
  }`;

export const allTextsQuery = `{
  "appTexts": ${appTextsGroq},
  "richTexts": ${infoTextsGroq},
  "links": ${linksGroq},
  "settings": ${settingsGroq}
}`;
