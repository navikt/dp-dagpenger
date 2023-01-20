import { Task, Place, Information, Copy, DialogReport } from "@navikt/ds-icons";
import React from "react";

type IIconSize = "small" | "large";

interface IProps {
  name: "task" | "place" | "info" | "copy" | "dialogReport";
  backgroundColor?: string;
  size?: IIconSize;
}

export const Icon = ({ name, backgroundColor, size }: IProps) => {
  function scaledIcon(IkonComponent, fontSize) {
    return <IkonComponent style={{ fontSize }} />;
  }

  function getWrapperSize(size: IIconSize) {
    const large = { width: "100px", height: "100px" };
    const small = { width: "55px", height: "55px" };
    return size === "small" ? small : large;
  }

  function getIconSize(size: IIconSize) {
    return size === "small" ? "24px" : "45px";
  }

  function getIcon(name: string) {
    switch (name) {
      case "task":
        return Task;
      case "place":
        return Place;
      case "info":
        return Information;
      case "copy":
        return Copy;
      case "dialogReport":
        return DialogReport;
      default:
        throw new Error("No SVG for " + name);
    }
  }

  const SVG = getIcon(name);

  const wrapperStyle = {
    display: "flex",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    ...getWrapperSize(size),
    backgroundColor: backgroundColor || "#99C2E8",
  };

  return <div style={wrapperStyle}>{scaledIcon(SVG, getIconSize(size))}</div>;
};
