import { NextApiHandler } from "next";
import { AvsenderMottaker, Datotype, Journalposttype } from "../../../saf";
import { hentDokumentOversikt } from "../../../lib/saf.service";
import { withSentry } from "@sentry/nextjs";
import { getSession } from "../../../lib/auth.utils";
import { decodeJwt } from "@navikt/dp-auth";
import { safAudience } from "../../../lib/audience";
import { logger } from "@navikt/next-logger";

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

export const handleDokumenter: NextApiHandler<Journalpost[]> = async (
  req,
  res
) => {
  const session = await getSession(req);
  if (!session) return res.status(401).end();
  const payload = decodeJwt(session.token);

  const fnr = payload.pid as string;

  let jposter;
  try {
    const {
      dokumentoversiktSelvbetjening: { journalposter },
    } = await hentDokumentOversikt(await session.apiToken(safAudience), fnr);
    jposter = journalposter;

    logger.info(`Hentet ${jposter.length} journalposter`);
  } catch (errors) {
    logger.error(`Feil fra SAF: ${errors.response}`);
    return res.status(500).end();
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
      am.type == "FNR" && am.id === fnr;

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

  const journalpostRespons: Journalpost[] = jposter
    .map(mapTilRettDato)
    .map(berikAvsenderMottaker)
    .map(({ journalpostId, dokumenter, ...rest }) => {
      const berikDokmedType = (dok, index) => ({
        // Første vedlegg er alltid hoveddokument
        type: index == 0 ? "Hoved" : "Vedlegg",
        ...dok,
      });

      const berikMedBrukerTilgang = ({ dokumentvarianter, ...rest }) => {
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
        return { brukerHarTilgang: dokumentetKanVises(), ...rest };
      };

      const byggForhandsvisningLink = ({ dokumentInfoId, ...rest }) => ({
        links: [
          {
            href: `${process.env.NEXT_PUBLIC_BASE_PATH}/api/dokumenter/${journalpostId}/${dokumentInfoId}/forhandsvisning`,
            rel: "preview",
            type: "GET",
          },
        ],
        dokumentInfoId,
        ...rest,
      });

      return {
        journalpostId,
        ...rest,
        dokumenter: dokumenter
          .map(berikDokmedType)
          .map(berikMedBrukerTilgang)
          .map(byggForhandsvisningLink)
          .map(({ dokumentInfoId, ...rest }) => ({
            id: dokumentInfoId,
            ...rest,
          })),
      };
    });

  res.json(journalpostRespons);
};

export default withSentry(handleDokumenter);
