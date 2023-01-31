import classnames from "classnames";
import React, { ReactNode } from "react";
import styles from "./Section.module.css";

interface IProps {
  highlighted?: boolean;
  children: ReactNode;
}

export function Section(props: IProps) {
  const { highlighted, children } = props;

  return (
    <section
      className={classnames(styles.section, {
        [styles.highlighted]: highlighted,
      })}
    >
      {children}
    </section>
  );
}
