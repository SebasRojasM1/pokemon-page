import '../assets/styles/modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

function Modal({ isOpen, onClose, imageSrc, altText }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt={altText} className="modal-image" />
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default Modal;