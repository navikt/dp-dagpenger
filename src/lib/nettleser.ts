import PDFObject from "pdfobject";

export const kanVisePdf = (): boolean => {
  return PDFObject.supportsPDFs;
};
