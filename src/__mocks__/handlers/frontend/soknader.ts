import { Søknad } from "../../../pages/api/soknader";

export default function soknaderResolver(req, res, ctx) {
  const mockSoknader: Søknad[] = [
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "123",
      søknadsType: "NySøknad",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
    },
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "456",
      søknadsType: "NySøknad",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
    },
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "789",
      søknadsType: "NySøknad",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
    },
  ];
  return res(ctx.json(mockSoknader));
}
