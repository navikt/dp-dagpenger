import nc from "next-connect";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: process.env.PERSONOPPLYSNINGER_API_URL,
  changeOrigin: true,
  onProxyReq,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(async (responseBuffer) => {
    const response = responseBuffer.toString("utf8"); // convert buffer to string
    const json = JSON.parse(response);
    return JSON.stringify(json.personalia);
  }),
});

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

// @ts-ignore:mangler grunn
export default nc().use(proxy);
