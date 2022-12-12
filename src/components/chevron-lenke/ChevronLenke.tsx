/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* onClick er egentlig fyfy, så når vi logger klikk for statistikk må vi disable de ovenfor. */
import { Next } from "@navikt/ds-icons";
import Link from "next/link";
import styles from "./ChevronLenke.module.css";

interface Props {
  tekst: string;
  url: string;
  clickCallback: (s: string) => void;
}

export const ChevronLenke = (props: Props) => {
  const callback =
    props.clickCallback !== undefined ? props.clickCallback : (s) => null;
  return (
    <Link href={props.url} passHref>
      <a onClick={() => callback(props.tekst)} className={styles.chevronLink}>
        <Next />
        <span>{props.tekst}</span>
      </a>
    </Link>
  );
};
