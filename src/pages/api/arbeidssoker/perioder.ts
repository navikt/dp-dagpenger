import { createProxyMiddleware } from "http-proxy-middleware";
import {
  AuthedNextApiRequest,
  withMiddleware,
} from "../../../auth/middlewares";
import { NextApiResponse } from "next";

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

function handleRegistrering(req: AuthedNextApiRequest, res: NextApiResponse) {
  req.query = {
    ...req?.query,
    fraOgMed: fraOgMed.toISOString(),
    tilOgMed: tilOgMed.toISOString(),
    fnr: req.user.fnr,
  };
  return proxy;
}

// @ts-ignore:mangler grunn
export default withMiddleware(handleRegistrering());
