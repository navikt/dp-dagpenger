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
    søknadId: "FBEECCE8-37FD-458E-8E0A-75390790EB24",
    tittel: "Søknad om dagpenger (ikke permittert)",
    datoInnsendt: "2021-06-10T14:14:54.065",
  },
];

const resultat = {
  results: ettersendelser,
  successFullSources: [],
  failedSources: ["HENVENDELSE"],
};

export const ettersendingResolver = (req, res, ctx) => {
  return res(ctx.json(resultat));
};
