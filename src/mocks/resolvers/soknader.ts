const oppgaver = [
  {
    id: "K1:Vartpenger",
    behandlingskjedeId: "10010WQHA",
    beskrivelse: "Vartpenger (K1)",
    opprettet: "2021-04-08T21:25:53.686",
    oppgaveType: "Vedlegg",
    tilstand: "Uferdig",
  },
  {
    id: "K1:Etterlønn fra arbeidsgiver",
    behandlingskjedeId: "10010WQHA",
    beskrivelse: "Etterlønn fra arbeidsgiver (K1)",
    opprettet: "2021-04-08T21:25:53.688",
    oppgaveType: "Vedlegg",
    tilstand: "Uferdig",
  },
  {
    id: "10010WQHA",
    behandlingskjedeId: "10010WQHA",
    beskrivelse: "",
    opprettet: "2021-04-08T21:25:53.689",
    oppgaveType: "Få vedtak",
    tilstand: "Uferdig",
  },
  {
    id: "10010WQHA",
    behandlingskjedeId: "10010WQHA",
    beskrivelse: "",
    opprettet: "2021-04-08T21:25:53.688",
    oppgaveType: "Søke om dagpenger",
    tilstand: "Ferdig",
  },
];

const soknader = [
  {
    id: "123",
    tilstand: "Uferdig",
    søknadstidspunkt: "2013-03-03T14:23:00",
    // TODO: APIet lister ikke ut oppgaver her oppgaver,
  },
  {
    id: "3243",
    tilstand: "Ferdig",
    søknadstidspunkt: "2013-03-03T14:23:00",
    // oppgaver,
  },
  {
    id: "234",
    tilstand: "Ferdig",
    søknadstidspunkt: "2013-03-03T14:23:00",
    // oppgaver,
  },
  {
    id: "345",
    tilstand: "Ferdig",
    søknadstidspunkt: "2013-03-03T14:23:00",
    // oppgaver,
  },
];

export const soknadByIdResolver = (req, res, ctx) => {
  const { soknadsId } = req.params;
  const s = soknader.filter((s) => s.id === soknadsId);

  if (s.length) {
    return res(ctx.json(s[0]));
  } else {
    return res(ctx.status(404));
  }
};

export const soknaderResolver = (req, res, ctx) => {
  return res(ctx.json(soknader));
};
