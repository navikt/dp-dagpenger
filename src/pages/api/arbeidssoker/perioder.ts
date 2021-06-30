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

const leggTilQueries = (user) => {
  const query = new URLSearchParams();
  if (user) query.append("fnr", user.fnr);
  query.append("fraOgMed", formaterDato(new Date()));

  return `?${query.toString()}`;
};

function pathRewrite(path, request) {
  return path + leggTilQueries(request.user);
}

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

// @ts-ignore:mangler grunn
export default withMiddleware(veilarbProxy);
