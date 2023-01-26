import React, { ReactNode } from "react";
import styles from "./Section.module.css";
import classnames from "classnames";
import { SectionContent } from "./SectionContent";

interface IProps {
  id?: string;
  iconSvg?: ReactNode;
  fullWith?: boolean;
  children?: ReactNode;
}

export function Section(props: IProps) {
  const { id, iconSvg, fullWith, children } = props;

  const Container = fullWith ? React.Fragment : SectionContent;

  return (
    <div
      id={id}
      className={classnames(styles.section, { [styles.withIcon]: iconSvg })}
    >
      {iconSvg && <div className={styles.icon}>{iconSvg}</div>}
      <Container>{children}</Container>
    </div>
  );
}
