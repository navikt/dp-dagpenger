import { faker } from "@faker-js/faker";
import { Journalpost } from "../../../pages/api/dokumenter";
import syntheticUserFnr from "./syntheticUserFnr";
import { AvsenderMottakerIdType, Journalposttype } from "../../../saf";

export const dokumentListeResolver = (req, res, ctx) => {
  const journalposter: Journalpost[] = [...Array(12)].map((_, ji) => {
    const journalpostId = faker.number.toString();
    const antallDokumenter = ji === 4 ? 1 : 3;
    return {
      journalpostId,
      tittel: ji === 0 ? "" : faker.lorem.sentence(),
      journalposttype: Journalposttype.U,
      dato: faker.date.past().toISOString(),
      brukerErAvsenderMottaker: ji === 2 ? true : false,
      avsender: null,
      mottaker: {
        id: ji === 2 ? syntheticUserFnr : faker.string.uuid(),
        type: AvsenderMottakerIdType.Fnr,
      },
      tema: "DAG",
      dokumenter: [...Array(antallDokumenter)].map((_, i) => {
        const id = faker.string.uuid();
        const type = i == 0 ? "Hoved" : "Vedlegg";
        const skjulDokument = (ji === 3 && i === 0) || (ji === 2 && i === 1);
        return {
          id,
          tittel: faker.lorem.sentence(),
          type,
          brukerHarTilgang: !skjulDokument,
          links: [
            {
              href: `/api/dokumenter/${journalpostId}/${id}/forhandsvisning`,
              rel: "preview",
              type: "GET",
            },
          ],
        };
      }),
    };
  });
  return res(ctx.json(journalposter));
};
