import './ModalHeader.css';
import iconModal from '../../../assets/icons/iconModal.svg';
import iconModalClose from '../../../assets/icons/iconModalClose.svg';
import React, { useState } from 'react';

function ModalHeader(props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse justify-between w-full items-center">
        <button
          className="flex modal-text mt-5 mr-5 focus:outline-none hover:underline items-center modal-close-button"
          onClick={props.closeAction}
        >
          <img
            src={iconModalClose}
            alt="close Modal"
            className="transform scale-75"
          />
          <span>cancel</span>
        </button>
        <button
          className="flex focus:outline-none"
          onClick={props.previousPageFunction}
        >
          <span
            className="modal-text mt-5 ml-6 hover:underline"
            style={{ display: props.backButton ? 'block' : 'none' }}
          >
            back
          </span>
        </button>
      </div>
      <div
        className="flex w-full justify-between mt-5 items-center"
        style={{ backgroundColor: '#4B4A65', height: '100px' }}
      >
        <div className="flex items-center" style={{ marginLeft: '5%' }}>
          <img
            src={iconModal}
            className="transform scale-75"
            alt="icon modal"
          />
          <div className="flex flex-col">
            <span className="modal-title">{props.title}</span>
            <span className="modal-text">{props.description}</span>
          </div>
        </div>
        <div className="flex modal-pages-text">{props.pagination}</div>
      </div>
    </div>
  );
}

export default ModalHeader;
