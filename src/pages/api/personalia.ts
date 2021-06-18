import nc from "next-connect";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";

const proxy = createProxyMiddleware({
  target: `${process.env.PERSONOPPLYSNINGER_API_URL}/personalia`,
  changeOrigin: true,
  onProxyReq,
  selfHandleResponse: true,
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req) => {
    // @ts-ignore mens jeg tester
    const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
    console.log(exchange);

    if (proxyRes.headers["content-type"] === "application/json") {
      const json = JSON.parse(responseBuffer.toString("utf8"));
      console.log({ json });
      const response = Object.assign({}, json.personalia);
      console.log({ response });
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
