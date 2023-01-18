/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* onClick er egentlig fyfy, så når vi logger klikk for statistikk må vi disable de ovenfor. */

import { Next } from "@navikt/ds-icons";
import Link from "next/link";
import styles from "./ShortcutLink.module.css";

interface IProps {
  text: string;
  url: string;
  clickCallback: (s: string) => void;
}

export function ShortcutLink({ text, url, clickCallback }: IProps) {
  const callback = clickCallback !== undefined ? clickCallback : () => null;

  return (
    <Link href={url} passHref>
      <a onClick={() => callback(text)} className={styles.shortcutLink}>
        <Next />
        <span>{text}</span>
      </a>
    </Link>
  );
}
