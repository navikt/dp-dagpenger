import nc from "next-connect";
import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: process.env.VEILARBPROXY_URL,
  changeOrigin: true,
  onProxyReq,
});

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

// @ts-ignore
export default nc().use(proxy);
