import nc from "next-connect";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";

export type Personalia = {
  kontonummer: string;
};

const proxy = createProxyMiddleware({
  target: `${process.env.PERSONOPPLYSNINGER_API_URL}/personalia`,
  ignorePath: true,
  changeOrigin: true,
  onProxyReq,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req) => {
    if (proxyRes.headers["content-type"] === "application/json") {
      const json = JSON.parse(responseBuffer.toString("utf8"));
      const response: Personalia = { kontonummer: json.personalia.kontonr };
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
