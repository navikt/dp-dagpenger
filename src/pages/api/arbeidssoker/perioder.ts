import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiResponse } from "next";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../auth/middlewares";

const proxy = createProxyMiddleware({
  target: process.env.VEILARBPROXY_URL,
  changeOrigin: true,
  onProxyReq,
});

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

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

function handleRegistrering(
  req: AuthedNextApiRequest,
  res: NextApiResponse,
  next
) {
  (req.query.fnr = req.user.fnr),
    (req.query.fraOgMed = formatDate(fraOgMed)),
    (req.query.tilOgMed = formatDate(tilOgMed)),
    next();
}

// @ts-ignore:mangler grunn
export default withMiddleware(handleRegistrering).use(proxy);
