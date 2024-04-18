"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import { FunctionComponent } from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: any;
}

const ImageModal: FunctionComponent<ImageModalProps> = ({
  onClose,
  isOpen,
  src,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="h-96 w-80">
        <Image src={src} alt="img" fill className="object-contain" />
      </div>
    </Modal>
  );
};

export default ImageModal;
