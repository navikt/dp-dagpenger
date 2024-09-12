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

export const appTextsGroq = `* [_type=="mineDagpengerAppText" && language==$language]{
    ...coalesce(* [_id==^._id && language==$language][0]${appTextFields}, ${appTextFields})
  }`;

const infoTextsGroq = `* [_type=="mineDagpengerRichText" && language==$language]{
  ...coalesce(* [_id==^._id && language==$language][0]${infoTextsFields}, ${infoTextsFields})
  }`;

const linksGroq = `* [_type=="mineDagpengerLink" && language==$language]{
  ...coalesce(* [_id==^._id && language==$language][0]${linkFields}, ${linkFields})
  }`;

const settingsGroq = `* [_type=="mineDagpengerSetting" && language==$language]{
  ...coalesce(* [_id==^._id && language==$language][0]${settingFields}, ${settingFields})
  }`;

export const allTextsQuery = `{
  "appTexts": ${appTextsGroq},
  "richTexts": ${infoTextsGroq},
  "links": ${linksGroq},
  "settings": ${settingsGroq}
}`;
