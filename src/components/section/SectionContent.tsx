import { ReactNode } from "react";
import styles from "./Section.module.css";

interface IProps {
  children?: ReactNode;
}

export function SectionContent({ children }: IProps) {
  return <div className={styles.content}>{children}</div>;
}
