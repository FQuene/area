import './ServiceStatus.css';
import servicesAdapter from '../../adapters/services/services.adapter';
import React, { useState } from 'react';
import Modal from 'react-modal';
import SetNotifModal from '../../components/SetNotifModal/SetNotifModal';

const customModal = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(39, 38, 53, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#36344B',
    width: '60%',
    height: '65%',
    padding: '0px',
    borderStyle: 'none',
    borderRadius: '25px',
  },
};

function ServicesStatus(props) {
  const [modalIsOpen, setIsOpen] = useState();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const launchAction = () => {
    if (props.modal == 'modal_notifs') openModal();
    else window.location.href = props.oauthLink;
  };

  const disconnect = async () => {
    servicesAdapter.removeToken(props.disconnect).then((response) => {
      window.location.replace('/services');
    });
  };

  if (!props.isConnected) {
    return (
      <div
        className="flex service-status-background items-center justify-center"
        style={{ backgroundColor: `${props.backgroundColor}` }}
      >
        <div
          className="flex justify-center items-center"
          style={{ width: '85%' }}
        >
          <div className="flex flex-col items-center mr-9">
            <img
              src={props.logoLink}
              alt="logo service"
              style={{ width: '50px', height: '50px' }}
            />
            <span className="service-status-name mt-3">{props.service}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex">
              <span className="service-status-text mr-2">Status</span>
              <button
                className="service-state-not-connected focus:outline-none cursor-text"
                disabled={true}
              >
                <span>not connected</span>
              </button>
            </div>
            <button
              className="service-switch-button mt-4 focus:outline-none"
              onClick={launchAction}
            >
              <span>connect</span>
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customModal}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <SetNotifModal closeAction={closeModal}></SetNotifModal>
            </Modal>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="flex service-status-background items-center justify-center"
        style={{ backgroundColor: `${props.backgroundColor}` }}
      >
        <div
          className="flex justify-center items-center"
          style={{ width: '85%' }}
        >
          <div className="flex flex-col items-center mr-9">
            <img
              src={props.logoLink}
              alt="logo service"
              style={{ width: '50px', height: '50px' }}
            />
            <span className="service-status-name mt-1">{props.service}</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex">
              <span className="service-status-text mr-2">Status</span>
              <button
                className="service-state-connected focus:outline-none cursor-text"
                disabled={true}
              >
                <span>connected</span>
              </button>
            </div>
            <button
              className="service-switch-button mt-4 focus:outline-none"
              onClick={disconnect}
            >
              <span>disconnect</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ServicesStatus;
