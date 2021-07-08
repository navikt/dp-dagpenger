import { Søknad } from "../../../pages/api/soknader";

export default function soknaderResolver(req, res, ctx) {
  const mockSoknader: Søknad[] = [
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "123",
      søknadsType: "NySøknad",
      søknadId: "987",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
    },
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "456",
      søknadsType: "NySøknad",
      søknadId: "654",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
    },
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "789",
      søknadsType: "NySøknad",
      søknadId: "321",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
    },
  ];
  return res(ctx.delay(), ctx.json(mockSoknader));
}
