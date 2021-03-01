import { useEffect, useState } from "react";

interface ApiResponse {
  "@behov": any[];
  fødselsnummer: string;
  session: string;
  "@løsning": {};
}

export default function Behov() {
  const [data, setData] = useState({});
  useEffect(() => {
    const ws = new WebSocket(process.env.WEBSOCKET_API);
    ws.onmessage = onMessage;
    ws.send(JSON.stringify(["Søknader"]));
  });

  function onMessage(event) {
    const data = JSON.parse(event.data);
    setData(data);
  }

  return <>{JSON.stringify(data)}</>;
}
