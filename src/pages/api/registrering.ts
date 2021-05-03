import nc from "next-connect";
import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: process.env.VEILARBPROXY_URL,
  changeOrigin: true,
});

// @ts-ignore
export default nc().use(proxy);
