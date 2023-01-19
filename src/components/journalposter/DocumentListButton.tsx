import { ReactComponentLike } from "prop-types";
import React from "react";

export interface IProps {
  text: string;
  onClick?: (e?: any) => void;
  Ikon?: ReactComponentLike;
  disabled?: boolean;
  ariaExpanded?: boolean;
}

export default function DocumentListButton(props: IProps): JSX.Element {
  const { onClick, text, Ikon, disabled, ariaExpanded } = props;

  const buttonAttrs = {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyPress: onClick,
  };

  const additionalAttrs = disabled ? {} : buttonAttrs;

  return (
    <>
      <div
        {...additionalAttrs}
        aria-expanded={ariaExpanded}
        className={`dp-knapp ${!disabled ? "aktiv" : ""}`}
      >
        {Ikon && (
          <div style={{ width: "24px", height: "24px" }}>
            <Ikon style={{ fontSize: "24px" }} />
          </div>
        )}
        <span
          className={`${Ikon ? "withIkon" : "withoutIkon"} ${
            !disabled ? "aktiv" : ""
          }`}
        >
          {text}
        </span>
      </div>
      <style jsx>
        {`
          .dp-knapp {
            padding-bottom: 10px;
            display: flex;
            align-items: flex-start;
            justify-content: left;
          }

          .dp-knapp.aktiv {
            color: #0067c5;
            align-items: center;
          }
          .dp-knapp.aktiv:hover {
            cursor: pointer;
          }
          span.aktiv:hover {
            text-decoration: underline;
          }
          .withIkon {
            margin-left: 10px;
          }
          .withoutIkon {
            margin-left: 34px;
          }
        `}
      </style>
    </>
  );
}
