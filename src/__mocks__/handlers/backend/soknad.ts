const soknad = [
  {
    søknadId: "e3656e83-f7ce-4c24-801a-aeb8d369b1a6",
    erNySøknadsdialog: true,
    endreLenke:
      "https://arbeid.dev.nav.no/dagpenger/soknad/e3656e83-f7ce-4c24-801a-aeb8d369b1a6/kvittering",
    skjemaKode: "NAV 04-01.03",
    tittel: "Søknad om dagpenger (ikke permittert)",
    journalpostId: "11",
    søknadsType: "NySøknad",
    kanal: "Digital",
    datoInnsendt: "2022-08-12T09:38:03.065623",
    vedlegg: [
      {
        skjemaNummer: "123",
        navn: "navn",
        status: "LastetOpp",
      },
    ],
  },
  {
    søknadId: "1234TEST",
    erNySøknadsdialog: false,
    endreLenke:
      "https://tjenester.nav.no/soknaddagpenger-innsending/startettersending/1234TEST",
    skjemaKode: "NAV 04-01.03",
    tittel: "Søknad om dagpenger (ikke permittert)",
    journalpostId: "1",
    søknadsType: "NySøknad",
    kanal: "Digital",
    datoInnsendt: "2022-08-12T09:38:03.064687",
    vedlegg: [
      {
        skjemaNummer: "123",
        navn: "navn",
        status: "LastetOpp",
      },
    ],
  },
];

export const soknadResolver = (req, res, ctx) => {
  return res(ctx.json(soknad));
};
