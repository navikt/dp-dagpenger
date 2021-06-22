export const dokumenter = (req, res, ctx) => {
  if (!req.headers.has("Authorization"))
    return res(ctx.errors("Not authorized"));
  if (!("fnr" in req.variables)) return res(ctx.errors("Mangler fnr"));
  if (!req.headers.has("Nav-Callid") || !req.headers.has("Nav-Consumer-Id"))
    throw new Error("Request må ha Nav-Call-Id og Nav-Consumer-Id");

  return res(ctx.data(sample));
};

export const dokument = (req, res, ctx) => {
  if (!req.headers.has("Authorization"))
    return res(ctx.errors("Not authorized"));
  if (!req.headers.has("Nav-Callid") || !req.headers.has("Nav-Consumer-Id"))
    throw new Error("Request må ha Nav-Call-Id og Nav-Consumer-Id");

  return res(ctx.set("Content-disposition", "inline;"), ctx.text("binær"));
};
const sample = {
  dokumentoversiktSelvbetjening: {
    tema: [
      {
        kode: "DAG",
        journalposter: [
          {
            journalpostId: "429111291",
            tittel: "MASKERT_FELT",
            journalposttype: "U",
            journalstatus: "FERDIGSTILT",
            avsender: null,
            mottaker: {
              id: "123",
              tpe: "FNR",
            },
            relevanteDatoer: [
              {
                dato: "2018-01-01T12:00:00",
                datotype: "DATO_OPPRETTET",
              },
            ],
            dokumenter: [
              {
                dokumentId: "441010176",
                tittel: "MASKERT_FELT",
              },
            ],
          },
          {
            journalpostId: "429108246",
            tittel: "MASKERT_FELT",
            journalposttype: "U",
            journalstatus: "FERDIGSTILT",
            avsender: null,
            mottaker: {
              id: "123",
              tpe: "FNR",
            },
            relevanteDatoer: [
              {
                dato: "2018-01-01T12:00:00",
                datotype: "DATO_OPPRETTET",
              },
            ],
            dokumenter: [
              {
                dokumentInfoId: "441007131",
                tittel: "MASKERT_FELT",
              },
            ],
          },
          {
            journalpostId: "428965411",
            tittel: "MASKERT_FELT",
            journalposttype: "I",
            journalstatus: "JOURNALFOERT",
            avsender: {
              id: "123",
              tpe: "FNR",
            },
            mottaker: null,
            relevanteDatoer: [
              {
                dato: "2018-01-01T12:00:00",
                datotype: "DATO_OPPRETTET",
              },
            ],
            dokumenter: [
              {
                dokumentInfoId: "440831549",
                tittel: "MASKERT_FELT",
              },
              {
                dokumentInfoId: "440831548",
                tittel: "MASKERT_FELT",
              },
            ],
          },
        ],
      },
      {
        kode: "OPP",
        journalposter: [
          {
            journalpostId: "429111291",
            tittel: "MASKERT_FELT",
            journalposttype: "U",
            journalstatus: "FERDIGSTILT",
            avsender: null,
            mottaker: {
              id: "123",
              tpe: "FNR",
            },
            relevanteDatoer: [
              {
                dato: "2018-01-01T12:00:00",
                datotype: "DATO_OPPRETTET",
              },
            ],
            dokumenter: [
              {
                dokumentId: "441010176",
                tittel: "MASKERT_FELT",
              },
            ],
          },
          {
            journalpostId: "429108246",
            tittel: "MASKERT_FELT",
            journalposttype: "U",
            journalstatus: "FERDIGSTILT",
            avsender: null,
            mottaker: {
              id: "123",
              tpe: "FNR",
            },
            relevanteDatoer: [
              {
                dato: "2018-01-01T12:00:00",
                datotype: "DATO_OPPRETTET",
              },
            ],
            dokumenter: [
              {
                dokumentInfoId: "441007131",
                tittel: "MASKERT_FELT",
              },
            ],
          },
          {
            journalpostId: "428965411",
            tittel: "MASKERT_FELT",
            journalposttype: "I",
            journalstatus: "JOURNALFOERT",
            avsender: {
              id: "123",
              tpe: "FNR",
            },
            mottaker: null,
            relevanteDatoer: [
              {
                dato: "2018-01-01T12:00:00",
                datotype: "DATO_OPPRETTET",
              },
            ],
            dokumenter: [
              {
                dokumentInfoId: "440831549",
                tittel: "MASKERT_FELT",
              },
              {
                dokumentInfoId: "440831548",
                tittel: "MASKERT_FELT",
              },
            ],
          },
        ],
      },
    ],
  },
};
