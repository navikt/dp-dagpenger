export const dokumenterResolver = (req, res, ctx) => {
  if (!req.headers.has("Authorization"))
    return res(ctx.errors("Not authorized"));
  if (!("fnr" in req.variables)) return res(ctx.errors("Mangler fnr"));
  if (!req.headers.has("Nav-Callid") || !req.headers.has("Nav-Consumer-Id"))
    throw new Error("Request må ha Nav-Call-Id og Nav-Consumer-Id");

  return res(ctx.data(sample));
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
