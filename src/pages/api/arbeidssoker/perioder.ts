import { createProxyMiddleware } from "http-proxy-middleware";
import { withMiddleware } from "../../../auth/middlewares";

const proxy = createProxyMiddleware({
  target: process.env.VEILARBPROXY_URL,
  changeOrigin: true,
  onProxyReq,
});

const tilOgMed = new Date();
const fraOgMed = trekkFraDato(tilOgMed, 105);

function trekkFraDato(dato: Date, dager: number): Date {
  return new Date(new Date().setDate(dato.getDate() - dager));
}

function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat("no", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date).split(".").reverse().join("-");
}

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
  proxyReq.query.fnr = proxyReq.user.fnr;
  proxyReq.query.fraOgMed = formatDate(fraOgMed);
  proxyReq.query.tilOgMed = formatDate(tilOgMed);
}

// @ts-ignore:mangler grunn
export default withMiddleware(proxy);
