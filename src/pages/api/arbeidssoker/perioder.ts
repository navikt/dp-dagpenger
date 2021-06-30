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

function formaterDato(date: Date) {
  return periodeFormatter.format(date).split(".").reverse().join("-");
}

const leggTilQueries = (user, fraOgMed) => {
  const query = new URLSearchParams();
  if (user) query.append("fnr", user.fnr);
  query.append("fraOgMed", fraOgMed);

  return `?${query.toString()}`;
};

function pathRewrite(path, request) {
  const queryObject = new URL(request.url).searchParams;
  const fraOgMed = queryObject.get("fom") || formaterDato(new Date());

  return path + leggTilQueries(request.user, fraOgMed);
}

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

// @ts-ignore:mangler grunn
export default withMiddleware(veilarbProxy);
