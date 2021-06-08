import { Dokumentvariant, Variantformat } from "../saf";

export const generateDokumentVariant = (
  brukerHarTilgang = true,
  variantformat: Variantformat = Variantformat.Arkiv
): Dokumentvariant => {
  return {
    variantformat,
    brukerHarTilgang,
    code: [],
  };
};
