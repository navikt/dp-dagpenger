import { useEffect, useState } from "react";

interface ApiResponse {
  "@behov": any[];
  fødselsnummer: string;
  session: string;
  "@løsning": {};
}

const muligeBehov = ["Status", "Fajs", "Bengel"];

const wsUrl = (): string => {
  if (process.env.NEXT_PUBLIC_INNSYN_WS_URL)
    return process.env.NEXT_PUBLIC_INNSYN_WS_URL;

  // @ts-ignore
  const url = new URL(window.location);
  url.pathname = "/api/ws";
  url.protocol = "wss";
  return url.toString();
};

export default function Behov() {
  const [valgtBehov, setBehov] = useState(muligeBehov[0]);
  const [data, setData] = useState({});
  const [ws, setWs] = useState({});

  useEffect(() => {
    const _ws = new WebSocket(wsUrl());
    _ws.addEventListener("message", (event) => {
      onMessage(event);
    });
    setWs(_ws);
  }, []);

  function onMessage(event) {
    const data = JSON.parse(event.data);
    setData(data);
  }

  function handleSubmit(event) {
    // @ts-ignore
    ws.send(JSON.stringify({ behov: [valgtBehov] }));
    event.preventDefault();
  }

  if (!ws) return null;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Behov:
        <select onChange={(event) => setBehov(event.target.value)}>
          {muligeBehov.map((behov) => (
            <option key={behov}>{behov}</option>
          ))}
        </select>
      </label>
      <input type="submit" name="submit" value="Løs dette" />
      <label>
        Løsning:
        <textarea value={JSON.stringify(data, null, 2)} readOnly />
      </label>
    </form>
  );
}
