import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Notifikasjon } from "../components/Notifikasjoner";
import localizeSanityContent from "./localizeSanityContent";
import sanityClient from "@sanity/client";

//bruk "development" for å sjekke en testnotifikasjon lokalt
const dataset =
  process.env.NODE_ENV === "production" ? "production" : "development";

const client = sanityClient({
  projectId: "rt6o382n", //datasettet for tekster til dagpengeteamet
  dataset,
  useCdn: process.env.NODE_ENV === "production",
});

const initialValue: Notifikasjon[] = [];
const NotifikasjonContext = createContext(initialValue);

export const useNotifikasjonContext = () => useContext(NotifikasjonContext);

const notificationQuery = `*[_type == "notifikasjon" && visPaaInnsyn==true]`;

export default function NotifikasjonProvider(props: { children: ReactNode }) {
  const [notifikasjon, setNotifikasjon] = useState(initialValue);

  useEffect(() => {
    client.fetch(notificationQuery).then(setNotifikasjon).catch(console.error);
  }, []);

  return (
    <NotifikasjonContext.Provider value={localizeSanityContent(notifikasjon)}>
      {props.children}
    </NotifikasjonContext.Provider>
  );
}
