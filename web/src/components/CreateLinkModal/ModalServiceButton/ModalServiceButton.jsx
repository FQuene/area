import './ModalServiceButton.css';
import React, { useState } from 'react';

function ModalActionButton(props) {
  const [backgroundColor, setBackgroundColor] = useState(props.service.color);

  function toggleHover() {
    if (!props.disabled)
      setBackgroundColor(props.service.hoverColor);
  }

  function toggleLeave() {
    setBackgroundColor(props.service.color);
  }

  return (
    <div className="flex m-5">
      <button
        className="flex flex-col modal-action-button focus:outline-none items-center"
        style={{ background: `${backgroundColor}` }}
        onMouseOver={toggleHover}
        onMouseLeave={toggleLeave}
        onClick={() => {
          props.nextPageFunction();
          props.setActionReactionService(props.service);
        }}
        disabled={props.disabled}
      >
        <img
          src={props.service.image}
          alt="button icon"
          className="mt-7 mb-2"
          style={{ width: '45px', height: '45px' }}
        />
        <span className="modal-button-text">{props.service.name}</span>
      </button>
    </div>
  );
}

export default ModalActionButton;
