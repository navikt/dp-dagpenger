import React, { ReactNode } from "react";
import styles from "./Section.module.css";
import classnames from "classnames";

interface Props {
  id?: string;
  iconSvg?: ReactNode;
  fullWith?: boolean;
  children?: ReactNode;
}

export const Section = (props: Props) => {
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
};

interface ContentProps {
  children?: ReactNode;
}

export const SectionContent = (props: ContentProps) => {
  const { children } = props;

  return <div className={styles.content}>{children}</div>;
};
