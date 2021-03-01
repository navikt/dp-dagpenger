import nc from "next-connect";
import { createProxyMiddleware } from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: process.env.INNSYN_WS,
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    "^/api/ws": "",
  },
});

// @ts-ignore
export default nc().use(proxy);
