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

const fraOgMed = new Date();

function formaterDato(date: Date) {
  return periodeFormatter.format(date).split(".").reverse().join("-");
}

const leggTilQueries = (user) => {
  let query = "?";
  if (user) query += `fnr=${user.fnr}&`;
  query += `fraOgMed=${formaterDato(fraOgMed)}`;
  return query;
};

function pathRewrite(path, request) {
  console.log("Legger på", leggTilQueries(request.user));
  return path + leggTilQueries(request.user);
}

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

// @ts-ignore:mangler grunn
export default withMiddleware(veilarbProxy);
