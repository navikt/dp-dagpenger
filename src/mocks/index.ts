// @ts-ignore
if (typeof window === "undefined") {
  const { server } = require("./server");
  // TODO: Finn ut hvorfor vi begynner å requeste localhost:443
  //server.listen();
} else {
  const { worker } = require("./browser");
  worker.start();
}
