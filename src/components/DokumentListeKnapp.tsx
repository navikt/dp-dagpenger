import { ReactComponentLike } from "prop-types";

export interface DokumentListeKnappProps {
  tekst: string;
  onClick: (e?: any) => void;
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
        className="dp-knapp"
      >
        <Ikon />
        <span>{tekst}</span>
      </div>
      <style jsx>
        {`
          .dp-knapp {
            padding: 5px 0;
            display: flex;
            align-items: center;
            justify-content: left;
            color: #0067c5;
          }
          .dp-knapp:hover {
            cursor: pointer;
          }
          .dp-knapp:hover span {
            text-decoration: underline;
          }
          .dp-knapp:focus {
          }
          .dp-knapp span {
            margin-left: 10px;
          }
        `}
      </style>
    </>
  );
}
