import { HttpResponse } from "msw";

const vedtak = [
  {
    vedtakId: "2",
    fagsakId: "arenaId",
    status: "INNVILGET",
    datoFattet: "2021-06-10T14:18:07.292",
    fraDato: "2021-06-10T14:18:07.292",
    tilDato: "null",
  },
];

export const vedtakResolver = () => {
  return HttpResponse.json(vedtak);
};
