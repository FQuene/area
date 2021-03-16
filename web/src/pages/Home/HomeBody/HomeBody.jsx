import './HomeBody.css';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import iconPlus from '../../../assets/icons/iconPlus.svg';
import iconTwitch from '../../../assets/icons/iconTwitch.svg';
import iconTimer from '../../../assets/icons/iconTimer.svg';
import iconNotifs from '../../../assets/icons/iconNotification.svg';
import iconWeather from '../../../assets/icons/iconWeather.svg';
import iconMail from '../../../assets/icons/iconMail.svg';
import iconSpotify from '../../../assets/icons/iconSpotify.svg';
import iconMobile from '../../../assets/icons/iconMobile.svg';
import iconDiscord from '../../../assets/icons/iconDiscord.svg';
import iconInstagram from '../../../assets/icons/iconInstagram.svg';

import LinkComponent from '../../../components/LinkComponent/LinkComponent';
import CreateLinkModal from '../../../components/CreateLinkModal/CreateLinkModal';
import homeAdapter from '../../../adapters/home/home.adapter';

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
    height: '70%',
    padding: '0px',
    borderStyle: 'none',
    borderRadius: '25px',
  },
};

const backgroundColors = {
  twitch: '#A970FF',
  notifs: '#229EC6',
  mail: '#D95FB7',
  mobile: '#FBC12C',
  discord: '#7289DA',
};

const icons = {
  twitch: iconTwitch,
  timer: iconTimer,
  notifs: iconNotifs,
  weather: iconWeather,
  mail: iconMail,
  spotify: iconSpotify,
  mobile: iconMobile,
  discord: iconDiscord,
  instagram: iconInstagram,
};

function HomeBody(props) {
  const [modalIsOpen, setIsOpen] = useState();
  const [areas, setAreas] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {
    subtitle.style.color = 'red';
  }

  const getAreas = async () => {
    homeAdapter.getAreas().then((response) => {
      setAreas(response?.data);
    });
  };

  useEffect(() => {
    getAreas();
    console.log(areas);
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="flex flex-col" style={{ width: '85%' }}>
        <button
          className="flex add-link-button login-text-poppins mt-4 focus:outline-none justify-around items-center"
          style={{ marginTop: '50px', marginBottom: '45px' }}
          onClick={openModal}
        >
          <img
            className="ml-2"
            src={iconPlus}
            style={{ width: '25px', height: '25px' }}
          ></img>
          <span className="mr-8">créer un area</span>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          afterOpenModal={afterOpenModal}
          style={customModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <CreateLinkModal closeAction={closeModal}></CreateLinkModal>
        </Modal>
      </div>
      <div className="flex flex-wrap" style={{ width: '90%' }}>
        {areas &&
          areas.map((element, index) => (
            <div className="m-5" key={index}>
              <LinkComponent
                id={element.id}
                action={element.actionService}
                actionName={element.actionDes}
                actionParams={element.actionParams}
                reaction={element.reactionService}
                reactionName={element.reactionDes}
                reactionParams={element.reactionParams}
                backgroundColor={backgroundColors[element.reactionService]}
                actionIcon={icons[element.actionService]}
                reactionIcon={icons[element.reactionService]}
                enabled={element.enabled}
              ></LinkComponent>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomeBody;
