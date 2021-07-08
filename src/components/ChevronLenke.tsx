import { Next } from "@navikt/ds-icons";
import Lenke from "nav-frontend-lenker";

export const ChevronLenke = (props: {
  tekst: string;
  url: string;
  clickCallback?: (s: string) => void;
}) => {
  const callback =
    props.clickCallback !== undefined ? props.clickCallback : (s) => null;
  return (
    <Lenke
      href={props.url}
      style={{
        display: "flex",
        alignItems: "flex-start",
      }}
      onClick={() => callback(props.tekst)}
    >
      <div
        style={{
          height: "24px",
          width: "24px",
          flexShrink: 0,
        }}
      >
        <Next />
      </div>
      <span>{props.tekst}</span>
    </Lenke>
  );
};
