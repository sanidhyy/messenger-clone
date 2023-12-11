"use client";

import Modal from "@/app/components/modals/modal";
import Image from "next/image";

type ImageModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image src={src} alt="Image" className="object-cover" fill />
      </div>
    </Modal>
  );
};

export default ImageModal;
