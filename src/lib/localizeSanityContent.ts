export const fallbackLang = ["no", "en"];

// Kopiert fra https://www.sanity.io/docs/localization
function localizeSanityContent(value: any, language = "no") {
  const languages = [language, ...fallbackLang];

  if (Array.isArray(value)) {
    return value.map((v) => localizeSanityContent(v, language));
  } else if (value && typeof value == "object") {
    if (/^locale[A-Z]/.test(value._type)) {
      const bestMatch = languages.find((lang) => value[lang]);
      return bestMatch
        ? localizeSanityContent(value[bestMatch], language)
        : null;
    }

    return Object.keys(value).reduce((result, key) => {
      result[key] = localizeSanityContent(value[key], language);
      return result;
    }, {});
  }

  return value;
}

export default localizeSanityContent;
