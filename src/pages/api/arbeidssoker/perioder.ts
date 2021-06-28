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

function handleRegistrering(
  req: AuthedNextApiRequest,
  res: NextApiResponse,
  next
) {
  req.query = {
    ...req?.query,
    fraOgMed: fraOgMed.toISOString(),
    tilOgMed: tilOgMed.toISOString(),
    fnr: req.user.fnr,
  };
  return next();
}

// @ts-ignore:mangler grunn
export default withMiddleware(handleRegistrering).use(proxy);
