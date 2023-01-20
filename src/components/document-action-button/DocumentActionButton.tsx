import classNames from "classnames";
import { ReactComponentLike } from "prop-types";
import React from "react";
import styles from "./DocumentActionButton.module.css";

export interface IProps {
  text: string;
  onClick?: (e?: any) => void;
  Icon?: ReactComponentLike;
  disabled?: boolean;
  ariaExpanded?: boolean;
}

export function DocumentActionButton(props: IProps) {
  const { onClick, text, Icon, disabled, ariaExpanded } = props;

  const buttonAttributes = {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyPress: onClick,
  };

  const additionalAttrs = disabled ? {} : buttonAttributes;

  return (
    <div
      {...additionalAttrs}
      aria-expanded={ariaExpanded}
      className={classNames(styles.documentActionButton, {
        [styles.documentActionButtonActive]: !disabled,
      })}
    >
      {Icon && (
        <div className={styles.documentActionButtonIconContainer}>
          <Icon className={styles.documentActionButtonIconSize} />
        </div>
      )}
      <span
        className={classNames(styles.expandableAttechmentListButton, {
          [styles.expandableAttechmentListButtonWithIkon]: Icon,
          [styles.expandableAttechmentListButtonWithoutIkon]: !Icon,
        })}
      >
        {text}
      </span>
    </div>
  );
}
