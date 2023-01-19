import { ReactNode } from "react";
import styles from "./Section.module.css";

interface IProps {
  children?: ReactNode;
}

export function SectionContent(props: IProps) {
  return <div className={styles.content}>{props.children}</div>;
}
