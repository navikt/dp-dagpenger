import { NextApiResponse } from "next";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../auth/middlewares";
import { AvsenderMottaker, Datotype, Journalposttype } from "../../../saf";
import { hentDokumentOversikt } from "../../../utilities/saf.service";

const audience = `${process.env.SAF_SELVBETJENING_CLUSTER}:teamdokumenthandtering:safselvbetjening`;

export type Journalpost = {
  journalpostId: string;
  journalposttype: Journalposttype;
  tittel: string;
  dato: string;
  tema: string;
  dokumenter: Dokument[];
  avsender: AvsenderMottaker;
  mottaker: AvsenderMottaker;
  brukerErAvsenderMottaker: boolean;
};
export type Dokument = {
  id: string;
  tittel: string;
  links: Link[];
  type: DokumentType;
  brukerHarTilgang: boolean;
};
export type DokumentType = "Hoved" | "Vedlegg";
export type Link = { href: string; rel: LinkRel; type: LinkType };
export type LinkType = "GET" | "POST";
export type LinkRel = "preview";

export async function handleDokumenter(
  req: AuthedNextApiRequest,
  res: NextApiResponse<Journalpost[]>
) {
  const user = req.user;
  if (!user) return res.status(401).end();
  const token = await user.tokenFor(audience);

  let jposter;
  try {
    const {
      dokumentoversiktSelvbetjening: { journalposter },
    } = await hentDokumentOversikt(token, user.fnr);
    jposter = journalposter;
  } catch (errors) {
    return res.status(500).send(errors);
  }

  const mapTilRettDato = ({ relevanteDatoer, ...rest }) => {
    const { dato } = relevanteDatoer.find(
      (dato) => dato.datotype == Datotype.DatoOpprettet
    );
    return {
      dato,
      ...rest,
    };
  };

  const berikAvsenderMottaker = ({ avsender, mottaker, ...rest }) => {
    const brukerEr = (am: AvsenderMottaker) =>
      am.type == "FNR" && am.id === user.fnr;

    const brukerErAvsenderEllerMottaker = () => {
      if (avsender) return brukerEr(avsender);
      if (mottaker) return brukerEr(mottaker);
      return false;
    };
    return {
      brukerErAvsenderMottaker: brukerErAvsenderEllerMottaker(),
      ...rest,
    };
  };

  const dokumenter: Journalpost[] = jposter
    .map(mapTilRettDato)
    .map(berikAvsenderMottaker)
    .map(({ journalpostId, dokumenter, ...rest }) => {
      return {
        journalpostId,
        ...rest,
        dokumenter: dokumenter.map(
          ({ dokumentInfoId, tittel, dokumentvarianter, ...rest }, index) => {
            // Første vedlegg er alltid hoveddokument
            const type = index == 0 ? "Hoved" : "Vedlegg";

            const erArkiv = (variant) => variant.variantformat === "ARKIV";
            const getArkivVariant = (dokVarianter) => {
              if (dokVarianter) return dokVarianter.find(erArkiv);
              return null;
            };

            const dokumentetKanVises = () => {
              const variant = getArkivVariant(dokumentvarianter);
              if (variant) return variant.brukerHarTilgang;
              return false;
            };

            return {
              id: dokumentInfoId,
              tittel,
              type,
              brukerHarTilgang: dokumentetKanVises(),
              ...rest,
              links: [
                {
                  href: `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter/${journalpostId}/${dokumentInfoId}/forhandsvisning`,
                  rel: "preview",
                  type: "GET",
                },
              ],
            };
          }
        ),
      };
    });

  res.json(dokumenter);
}

export default withMiddleware(handleDokumenter);
