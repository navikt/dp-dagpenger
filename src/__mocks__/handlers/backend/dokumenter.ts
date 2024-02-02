import { HttpResponse } from "msw";

export const dokumenter = ({ request }) => {
  if (!request.headers.has("Authorization")) {
    return HttpResponse.json({
      errors: [
        {
          message: "Unautorized",
        },
      ],
    });
  }

  if (!("fnr" in request.variables)) {
    return HttpResponse.json({
      errors: [
        {
          message: "Mangler fnr",
        },
      ],
    });
  }
  
  if (
    !request.headers.has("Nav-Callid") ||
    !request.headers.has("Nav-Consumer-Id")
  ) {
    throw new Error("Request må ha Nav-Call-Id og Nav-Consumer-Id");
  }

  return HttpResponse.json({
    data: sample,
  });
};

export const dokument = ({ request }) => {
  if (!request.headers.has("Authorization")) {
    return new HttpResponse(null, { status: 401 });
  }
  if (
    !request.headers.has("Nav-Callid") ||
    !request.headers.has("Nav-Consumer-Id")
  ) {
    throw new Error("Request må ha Nav-Call-Id og Nav-Consumer-Id");
  }

  return new HttpResponse("binær", {
    headers: {
      "Content-disposition": "inline",
    },
  });
};

const sample = {
  dokumentoversiktSelvbetjening: {
    journalposter: [
      {
        journalpostId: "429111291",
        tittel: "MASKERT_FELT",
        journalposttype: "U",
        journalstatus: "FERDIGSTILT",
        tema: "DAG",
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
        tema: "DAG",
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
        tema: "DAG",
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
      {
        journalpostId: "429111291",
        tittel: "MASKERT_FELT",
        journalposttype: "U",
        journalstatus: "FERDIGSTILT",
        tema: "OPP",
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
        tema: "OPP",
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
        tema: "OPP",
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
};
