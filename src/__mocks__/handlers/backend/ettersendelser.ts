const ettersendelser = [
  {
    søknadId: "2",
    tittel: "Søknad om dagpenger (ikke permittert)",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "3",
    tittel: "Søknad om dagpenger (ikke permittert)",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "4",
    tittel: "Søknad om dagpenger (ikke permittert)",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "5",
    tittel: "Søknad om dagpenger (ikke permittert)",
    datoInnsendt: "2021-06-10T14:14:54.066",
  },
  {
    søknadId: "1",
    tittel: "Søknad om dagpenger (ikke permittert)",
    datoInnsendt: "2021-06-10T14:14:54.065",
  },
];

const resultat = {
  result: ettersendelser,
  successFullSources: [],
  failedSources: ["HENVENDELSE"],
};

export const ettersendingResolver = (req, res, ctx) => {
  return res(ctx.json(resultat));
};
