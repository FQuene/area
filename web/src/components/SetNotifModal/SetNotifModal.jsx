import './SetNotifModal.css';
import React, { useState } from 'react';
import iconNotification from '../../assets/icons/iconNotification.svg';
import servicesAdapter from '../../adapters/services/services.adapter';

function SetNotifModal() {
  const [key, setKey] = useState();

  const handleSumbit = () => {
    if (key.length < 5) return;

    servicesAdapter.addNewToken('notifs', key, {}).then(() => {
      window.location.replace('/services');
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex w-full justify-between mt-7 items-center"
        style={{ backgroundColor: '#4B4A65', height: '100px' }}
      >
        <div className="flex items-center" style={{ marginLeft: '5%' }}>
          <img
            src={iconNotification}
            className="transform scale-110 mr-3"
            alt="icon modal"
          />
          <div className="flex flex-col">
            <span className="modal-title">Notifs Setup</span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col notif-modal-text mt-5"
        style={{ width: '90%' }}
      >
        <span className="my-2">
          1 . Rendez vous sur <a href="https://pushover.net/">Pushover</a> et
          téléchargez l’application sur votre téléphone.
        </span>
        <span className="my-2">
          2 . Inscrivez vous et récupérez votre clé utilisateur.
        </span>
        <span className="my-2">3 . Renseignez la clé ci-dessous :</span>
      </div>
      <div className="flex flex-col mt-5 " style={{ width: '90%' }}>
        <div
          className="flex items-center justify-between flex-wrap"
          style={{ maxWidth: '400px' }}
        >
          <span className="notif-modal-input-text my-2 ">Key</span>
          <input
            className="notif-modal-input my-2 focus:outline-none"
            onChange={(e) => setKey(e.target.value)}
          ></input>
          <button
            className="notif-modal-submit-button focus:outline-none mt-5"
            onClick={handleSumbit}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetNotifModal;
