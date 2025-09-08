import * as React from "react";
import { Modal, ModalProps } from "react-bootstrap";
import { ButtonClose } from "./button.general";

interface GeneralModalProps extends ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  size?: "sm" | "lg" | "xl";
  show: boolean;
}

export const GeneralModal: React.FC<GeneralModalProps> = ({
  title,
  children,
  onClose,
  className = "",
  size = "lg",
  show,
  onHide,
  ...rest
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide || onClose}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`general-modal ${className}`}
      {...rest}
    >
      <Modal.Header>
        {title && (
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        )}
        <ButtonClose onClick={onHide || onClose} />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export const PopoverModal: React.FC<GeneralModalProps> = ({
  children,
  onClose,
  className = "",
  size = "sm",
  show,
  onHide,
  ...rest
}) => (
  <Modal
    show={show}
    onHide={onHide || onClose}
    size={size}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    className={`popover-modal ${className}`}
    backdrop="static"
    {...rest}
  >
    <Modal.Header>
      <ButtonClose onClick={onHide || onClose} />
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);

export const InternetErrorModal: React.FC<{ show: boolean; onClose: () => void }> = ({
  show,
  onClose,
}) => (
  <GeneralModal
    show={show}
    onClose={onClose}
    title="Internet Connection Error"
    size="sm"
    className="internet-error-modal"
  >
    <p>Please check your internet connection and try again.</p>
  </GeneralModal>
);

export const LoadingModal: React.FC<{ show: boolean; message?: string }> = ({
  show,
  message,
}) => (
  <GeneralModal
    show={show}
    title="Loading..."
    size="sm"
    className="loading-modal"
    backdrop="static"
    keyboard={false}
    onHide={() => {}}
  >
    <div className="loading-spinner text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p>{message || "Please wait while we process your request."}</p>
    </div>
  </GeneralModal>
);

export const ErrorModal: React.FC<{ show: boolean; onClose: () => void; error: string }> = ({
  show,
  onClose,
  error,
}) => (
  <GeneralModal
    show={show}
    onClose={onClose}
    title="Error"
    size="sm"
    className="error-modal"
  >
    <p>{error}</p>
  </GeneralModal>
);

export default GeneralModal;
