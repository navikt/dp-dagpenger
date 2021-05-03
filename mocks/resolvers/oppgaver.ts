export const soknadMedToManglendeVedlegg = (req, res, ctx) =>
  res(
    ctx.json({
      oppgaver: [
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
      ],
    })
  );

export const ettersendingMedEttVedlegg = (req, res, ctx) =>
  res(
    ctx.json({
      oppgaver: [
        {
          id: "K1:Vartpenger",
          behandlingskjedeId: "10010WQHA",
          beskrivelse: "Vartpenger (K1)",
          opprettet: "2021-04-08T21:25:53.686",
          oppgaveType: "Vedlegg",
          tilstand: "Ferdig",
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
      ],
    })
  );

export const fattetVedtak = (req, res, ctx) =>
  res(
    ctx.json({
      oppgaver: [
        {
          id: "K1:Vartpenger",
          behandlingskjedeId: "10010WQHA",
          beskrivelse: "Vartpenger (K1)",
          opprettet: "2021-04-08T21:25:53.686",
          oppgaveType: "Vedlegg",
          tilstand: "Ferdig",
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
          tilstand: "Ferdig",
        },
        {
          id: "10010WQHA",
          behandlingskjedeId: "10010WQHA",
          beskrivelse: "",
          opprettet: "2021-04-08T21:25:53.688",
          oppgaveType: "Søke om dagpenger",
          tilstand: "Ferdig",
        },
      ],
    })
  );
