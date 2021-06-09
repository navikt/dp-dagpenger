export const kanVisePdf = () => {
  // I dag må vi sjekke navigator.plugins, i framtida navigator.pdfSupported
  // https://github.com/whatwg/html/pull/6738
  // @ts-ignore I framtida vil browserene ha pdfSupported for å indikere at de kan vise PDF
  if (navigator && navigator.pdfSupported) {
    return true;
  } else {
    // @ts-ignore Å sjekke mot plugins er deprecated, men det eneste som funker nå
    if (navigator && navigator.plugins.item("pdf")) {
      return true;
    }
  }

  return false;
};
