import styles from "./layout.module.css";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: layoutProps): React.ReactElement {
  return <div className={styles.container}>{children}</div>;
}
