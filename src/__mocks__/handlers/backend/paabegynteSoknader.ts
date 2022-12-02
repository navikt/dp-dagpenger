export const paabegynteSoknader = [
  {
    tittel: "En tittel oversatt fra kodeverk",
    behandlingsId: "1234TEST",
    søknadId: "1234TEST",
    sistEndret: "2022-11-10T09:49:58.405091+01:00",
    erNySøknadsdialog: false,
    endreLenke:
      "https://tjenester.nav.no/soknaddagpenger-innsending/soknad/1234TEST",
  },
  {
    tittel: "Søknad om dagpenger",
    behandlingsId: "dacf8b30-c7a6-4ebd-ba7f-2f3021dd418d",
    søknadId: "dacf8b30-c7a6-4ebd-ba7f-2f3021dd418d",
    sistEndret: "2022-11-10T09:49:58.405091+01:00",
    erNySøknadsdialog: true,
    endreLenke:
      "https://arbeid.dev.nav.no/dagpenger/soknad/dacf8b30-c7a6-4ebd-ba7f-2f3021dd418d",
  },
];

export const paabegynteSoknadResolver = (req, res, ctx) => {
  return res(ctx.json(paabegynteSoknader));
};
