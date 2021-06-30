import { createProxyMiddleware } from "http-proxy-middleware";
import { withMiddleware } from "../../../auth/middlewares";

const veilarbProxy = createProxyMiddleware({
  target: process.env.VEILARBPROXY_URL,
  changeOrigin: true,
  onProxyReq,
  pathRewrite,
});

const periodeFormatter = new Intl.DateTimeFormat("no", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const ARBEIDSSOKER_PERIODE_FRA_OG_MED_FRATREKK = 105;
const trekkFraDato = (dato: Date): Date => {
  return new Date(
    new Date().setDate(
      dato.getDate() - ARBEIDSSOKER_PERIODE_FRA_OG_MED_FRATREKK
    )
  );
};

const tilOgMed = new Date();
const fraOgMed = trekkFraDato(tilOgMed);

function formaterDato(date: Date) {
  return periodeFormatter.format(date).split(".").reverse().join("-");
}

const leggTilQueries = (user) => {
  let query = "?";
  if (user) query += `fnr=${user.fnr}&`;
  query += `fraOgMed=${formaterDato(fraOgMed)}`;
  query += `&tilOgMed=${formaterDato(tilOgMed)}`;
  return query;
};

function pathRewrite(path, request) {
  return path + leggTilQueries(request.user);
}

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

// @ts-ignore:mangler grunn
export default withMiddleware(veilarbProxy);
