import React from 'react';
import '../App.css'; // Style for the modal

const Modal = ({ children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;
