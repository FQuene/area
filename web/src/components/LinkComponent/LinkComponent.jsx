import React, { useEffect, useState } from 'react';
import iconClose from '../../assets/icons/iconModalClose.svg';
import './LinkComponent.css';
import homeAdapter from '../../adapters/home/home.adapter';

function LinkComponent(props) {
  const [enabled, setEnabled] = useState(props.enabled);
  const [actionParams, setActionParams] = useState([]);
  const [reactionParams, setReactionParams] = useState([]);

  const handleEnabled = () => {
    homeAdapter.changeAreaOnOff(props.id, !enabled).then((rep) => {
      setEnabled(!enabled);
    });
  };

  const deleteArea = () => {
    homeAdapter.deleteArea(props.id).then((response) => {
      window.location.reload();
    });
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(props.actionParams)) {
      setActionParams((prevState) => [...prevState, value + ' ']);
    }

    for (const [key, value] of Object.entries(props.reactionParams)) {
      setReactionParams((prevState) => [...prevState, value + ' ']);
    }
  }, []);

  return (
    <div
      className="flex flex-col link-component justify-center items-center"
      style={{ backgroundColor: `${props.backgroundColor}`, height: 'auto' }}
    >
      <div
        className="flex justify-between items-center my-5"
        style={{ width: '90%' }}
      >
        <div className="relative inline-block w-10 mr-5 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={enabled}
            onChange={handleEnabled}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer focus:outline-none"
          />
          <label className="toggle-label block overflow-hidden h-6 rounded-full cursor-pointer"></label>
        </div>
        <div className="flex mr-1">
          <img
            src={iconClose}
            onClick={deleteArea}
            className="ml-3 cursor-pointer"
          ></img>
        </div>
      </div>

      <div className="flex flex-col justify-around" style={{ width: '90%' }}>
        <div className="flex mb-4">
          <img
            className="mx-1 mt-2"
            src={props.actionIcon}
            style={{ width: '33px', height: '33px' }}
          ></img>
          <div className="flex flex-col justify-center ml-4">
            {/* <div className="flex items-center"> */}
            <span className="title-poppins-link">
              Service{' '}
              <span className="text-poppins-link">
                {props.action.charAt(0).toUpperCase() +
                  props.action.substring(1)}
              </span>
            </span>
            {/* </div> */}
            <span className="title-poppins-link" style={{ fontSize: '15px' }}>
              Action{' '}
              <span className="text-poppins-link" style={{ fontSize: '14px' }}>
                {props.actionName}
              </span>
            </span>
            <span className="title-poppins-link" style={{ fontSize: '15px' }}>
              Options{' '}
              <span className="text-poppins-link" style={{ fontSize: '14px' }}>
                {actionParams}
              </span>
            </span>
          </div>
        </div>
        <div className="flex">
          <img
            className="mx-1 mt-2"
            src={props.reactionIcon}
            style={{ width: '33px', height: '33px' }}
          ></img>
          <div className="flex flex-col justify-center ml-4 mb-5">
            <span className="title-poppins-link">
              Service{' '}
              <span className="text-poppins-link">
                {' '}
                {props.reaction.charAt(0).toUpperCase() +
                  props.reaction.substring(1)}
              </span>
            </span>
            <span className="title-poppins-link" style={{ fontSize: '15px' }}>
              Reaction{' '}
              <span className="text-poppins-link" style={{ fontSize: '14px' }}>
                {props.reactionName}
              </span>
            </span>

            <div className="flex title-poppins-link">
              <span
                style={{
                  fontSize: '15px',
                }}
              >
                Options
              </span>
              <span
                className="text-poppins-link ml-1"
                style={{
                  fontSize: '14px',
                  msWordBreak: 'break-all',
                  wordBreak: 'break-all',
                }}
              >
                {reactionParams}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkComponent;
