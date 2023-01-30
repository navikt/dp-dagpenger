import classnames from "classnames";
import React, { ReactNode } from "react";
import styles from "./Section.module.css";

interface IProps {
  id?: string;
  fullWidth?: boolean;
  highlighted?: boolean;
  children?: ReactNode;
}

export function Section(props: IProps) {
  const { id, fullWidth, highlighted, children } = props;

  return (
    <section
      id={id}
      className={classnames(styles.section, {
        [styles.highlighted]: highlighted,
      })}
    >
      <div className={styles.gridContainer}>
        <div
          className={classnames(styles.defaultRowWidth, {
            [styles.fullRowWidth]: fullWidth,
          })}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
