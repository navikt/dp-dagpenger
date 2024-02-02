import { HttpResponse, delay } from "msw";
import { Søknad } from "../../../pages/api/soknader";

export default async function soknaderResolver() {
  const mockSoknader: Søknad[] = [
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "123",
      søknadsType: "NySøknad",
      søknadId: "987",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
      erNySøknadsdialog: true,
      endreLenke: "",
    },
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "456",
      søknadsType: "NySøknad",
      søknadId: "654",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
      erNySøknadsdialog: true,
      endreLenke: "",
    },
    {
      tittel: "Søknad om dagpenger",
      journalpostId: "789",
      søknadsType: "NySøknad",
      søknadId: "321",
      kanal: "Digital",
      datoInnsendt: new Date().toISOString(),
      vedlegg: [],
      erNySøknadsdialog: true,
      endreLenke: "",
    },
  ];

  await delay();

  return HttpResponse.json(mockSoknader);
}
