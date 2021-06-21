import nc from "next-connect";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: `${process.env.PERSONOPPLYSNINGER_API_URL}/personalia`,
  ignorePath: true,
  changeOrigin: true,
  onProxyReq,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req) => {
    if (proxyRes.headers["content-type"] === "application/json") {
      const json = JSON.parse(responseBuffer.toString("utf8"));
      const response = Object.assign({}, json.personalia);

      return JSON.stringify(response);
    }

    return responseBuffer;
  }),
});

function onProxyReq(proxyReq) {
  proxyReq.setHeader("Nav-Consumer-Id", "dp-dagpenger");
}

// @ts-ignore:mangler grunn
export default nc().use(proxy);