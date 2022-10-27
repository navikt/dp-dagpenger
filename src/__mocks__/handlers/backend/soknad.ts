const soknad = [
  {
    søknadId: "2",
    skjemaKode: "NAV01",
    journalpostId: "11",
    søknadsType: "NySøknad",
    kanal: "Digital",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "3",
    skjemaKode: "NAV01",
    journalpostId: "12",
    søknadsType: "NySøknad",
    kanal: "Digital",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "4",
    skjemaKode: "NAV01",
    journalpostId: "13",
    søknadsType: "NySøknad",
    kanal: "Digital",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "5",
    skjemaKode: "NAV01",
    journalpostId: "14",
    søknadsType: "NySøknad",
    kanal: "Digital",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "3B41A7A9-4C5C-4BC5-A1EF-C2741988A973",
    skjemaKode: "NAV01",
    journalpostId: "1",
    søknadsType: "NySøknad",
    kanal: "Digital",
    datoInnsendt: "2021-06-10T14:14:54.065",
  },
];

export const soknadResolver = (req, res, ctx) => {
  return res(ctx.json(soknad));
};
