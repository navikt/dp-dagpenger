import { NextApiRequest, NextApiResponse } from "next";

const soknadMedToManglendeVedlegg = {
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
};

const ettersendingMedEttVedlegg = {
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
};

const fattetVedtak = {
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
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = req.query;
  console.log("Query:", q);
  Object.keys(q).forEach((k) => {
    if (k === "manglendeVedlegg") {
      res.status(200).json(soknadMedToManglendeVedlegg);
    } else if (k === "ettersending") {
      res.status(200).json(ettersendingMedEttVedlegg);
    } else if (k === "ferdig") {
      res.status(200).json(fattetVedtak);
    }
  });
}
