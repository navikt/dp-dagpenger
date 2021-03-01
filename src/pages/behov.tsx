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
    const ws = new WebSocket(process.env.NEXT_PUBLIC_INNSYN_WS_URL);
    ws.onmessage = onMessage;
    ws.send(JSON.stringify(["Søknader"]));
  });

  function onMessage(event) {
    const data = JSON.parse(event.data);
    setData(data);
  }

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
