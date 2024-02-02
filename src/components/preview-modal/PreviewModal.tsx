import { Modal } from "@navikt/ds-react";
import { EmbeddedPDF } from "./EmbeddedPDF";

interface IProps {
  href: string;
  close: () => void;
  isOpen: boolean;
}

export function PreviewModal({ href, close, isOpen }: IProps) {
  return (
    <Modal open={isOpen} onClose={close}>
      <Modal.Header />
      <EmbeddedPDF href={href} />
    </Modal>
  );
}
