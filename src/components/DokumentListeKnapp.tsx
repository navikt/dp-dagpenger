import { ReactComponentLike } from "prop-types";

export interface DokumentListeKnappProps {
  tekst: string;
  onClick: () => void;
  Ikon: ReactComponentLike;
}

export default function DokumentListeKnapp({
  onClick,
  tekst,
  Ikon,
}: DokumentListeKnappProps): JSX.Element {
  return (
    <>
      <div
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyPress={onClick}
        className="dp-knapp lenke"
      >
        <Ikon />
        <span>{tekst}</span>
      </div>
      <style jsx>
        {`
          .dp-knapp {
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: left;
          }
          .dp-knapp span {
            margin-left: 10px;
          }
        `}
      </style>
    </>
  );
}
