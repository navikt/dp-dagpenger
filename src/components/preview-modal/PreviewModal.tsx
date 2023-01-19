import { Modal } from "@navikt/ds-react";
import { EmbeddedPDF } from "./EmbeddedPDF";

interface IProps {
  href: string;
  close: () => void;
  isOpen: boolean;
}

export default function PreviewModal({ href, close, isOpen }: IProps) {
  return (
    <Modal open={isOpen} onClose={close}>
      <EmbeddedPDF href={href} />
    </Modal>
  );
}
