import classNames from "classnames";
import { ReactComponentLike } from "prop-types";
import React from "react";
import styles from "./DocumentActionButton.module.css";

export interface IProps {
  text: string;
  onClick?: (e?: any) => void;
  Ikon?: ReactComponentLike;
  disabled?: boolean;
  ariaExpanded?: boolean;
}

export function DocumentActionButton(props: IProps) {
  const { onClick, text, Ikon, disabled, ariaExpanded } = props;

  const buttonAttrs = {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyPress: onClick,
  };

  const additionalAttrs = disabled ? {} : buttonAttrs;

  return (
    <div
      {...additionalAttrs}
      aria-expanded={ariaExpanded}
      className={classNames(styles.documentActionButton, {
        [styles.documentActionButtonActive]: !disabled,
      })}
    >
      {Ikon && (
        <div className={styles.documentActionButtonIconContainer}>
          <Ikon className={styles.documentActionButtonIconSize} />
        </div>
      )}
      <span
        className={classNames(styles.expandableAttechmentListButton, {
          [styles.expandableAttechmentListButtonWithIkon]: Ikon,
          [styles.expandableAttechmentListButtonWithoutIkon]: !Ikon,
        })}
      >
        {text}
      </span>
    </div>
  );
}
