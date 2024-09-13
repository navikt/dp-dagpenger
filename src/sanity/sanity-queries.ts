const appTextFields = `{
  textId,
  valueText
}`;

const settingFields = `{
  settingId,
  settingValue,
}`;

const infoTextsFields = `{
  textId,
  body
}`;

const linkFields = `{
  linkId,
  linkText,
  linkUrl,
  linkDescription
}`;

export const appTextsGroq = `* [_type=="mineDagpengerAppText" && language==$baseLang]{
  ...coalesce(* [textId==^.textId && language && $lang][0]${appTextFields}, ${appTextFields})
}`;

const richTextsGroq = `* [_type=="mineDagpengerRichText" && language==$baseLang]{
  ...coalesce(* [textId==^.textId && language && $lang][0]${infoTextsFields}, ${infoTextsFields})
}`;

const linksGroq = `* [_type=="mineDagpengerLink" && language==$baseLang]{
  ...coalesce(* [linkId==^.linkId && language && $lang][0]${linkFields}, ${linkFields})
}`;

const settingsGroq = `* [_type=="mineDagpengerSetting" && language==$baseLang]{
  ...coalesce(* [settingId==^.settingId && language && $lang][0]${settingFields}, ${settingFields})
}`;

export const allTextsQuery = `{
  "appTexts": ${appTextsGroq},
  "richTexts": ${richTextsGroq},
  "links": ${linksGroq},
  "settings": ${settingsGroq}
}`;
