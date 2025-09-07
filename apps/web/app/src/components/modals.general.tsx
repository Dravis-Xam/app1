import * as React from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { ButtonClose } from './button.general';

interface GeneralModalProps extends ModalProps {
    title?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    className?: string;
    size?: 'sm' | 'lg' | 'xl';
    onHide?: () => void;
    show: boolean;
}

export class GeneralModal extends React.Component<GeneralModalProps, {}> {
    render() {
        return (    
            <Modal
                show={this.props.show}
                onHide={this.props.onHide || this.props.onClose}
                size={this.props.size || "lg"}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={`general-modal ${this.props.className || ''}`}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.title}
                    </Modal.Title>
                    <ButtonClose onClick={this.props.onHide || this.props.onClose} />
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}   
                </Modal.Body>
            </Modal>
        );
    }   
}

export class PopoverModal extends React.Component<GeneralModalProps, {}> {
    render() {
        return (    
            <Modal
                show={this.props.show}
                onHide={this.props.onHide || this.props.onClose}
                size={this.props.size || "sm"}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={`popover-modal ${this.props.className || ''}`}
                backdrop="static"
            >
                <Modal.Header>  
                    <ButtonClose onClick={this.props.onHide || this.props.onClose} />
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        );
    }
}

export class InternetErrorModal extends React.Component<{ show: boolean; onClose: () => void }, {}> {
    render() {
        return (
            <GeneralModal
                show={this.props.show}
                onClose={this.props.onClose}
                title="Internet Connection Error"
                size="sm"
                className="internet-error-modal"
            >
                <p>Please check your internet connection and try again.</p>
            </GeneralModal>
        );
    }
}

export class LoadingModal extends React.Component<{ show: boolean; message?: string }, {}> {
    render() {
        return (
            <GeneralModal
                show={this.props.show}
                title="Loading..."
                size="sm"
                className="loading-modal"
                backdrop="static"
                keyboard={false}
                onHide={() => {}}
            >
                <div className="loading-spinner">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>{this.props.message || 'Please wait while we process your request.'}</p>
                </div>
            </GeneralModal>
        );
    }
}

export class ErrorModal extends React.Component<{ show: boolean; onClose: () => void; error: string }, {}> {
    render() {
        return (
            <GeneralModal
                show={this.props.show}
                onClose={this.props.onClose}
                title="Error"
                size="sm"
                className="error-modal"
            >
                <p>{this.props.error}</p>
            </GeneralModal>
        );
    }
}

export default GeneralModal;