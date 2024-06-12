import classnames from "classnames";
import React, { ReactNode } from "react";
import styles from "./Section.module.css";

interface IProps {
  id?: string;
  highlighted?: boolean;
  children: ReactNode;
  smallSpacing?: boolean;
}

export function Section(props: IProps) {
  const { id, highlighted, children, smallSpacing } = props;

  return (
    <section
      id={id}
      className={classnames(styles.section, {
        [styles.highlighted]: highlighted,
        [styles.smallSpacing]: smallSpacing,
      })}
    >
      {children}
    </section>
  );
}
