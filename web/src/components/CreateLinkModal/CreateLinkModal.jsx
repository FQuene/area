import './CreateLinkModal.css';
import React, { useState, forwardRef } from 'react';
import ModalHeader from './ModalHeader/ModalHeader';
import ModalServiceButton from './ModalServiceButton/ModalServiceButton';
import services from '../../adapters/areasData/services';
import DatePicker from 'react-datepicker';
import Popover from '@material-ui/core/Popover';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import axios from 'axios';
import { asyncLocalStorage } from '../../adapters/global/asyncLocalStorage';

function CreateLinkModal(props) {
  // handle Time Picker
  const [inputDate, setInputDate] = useState(new Date());
  const [inputTime, setInputTime] = useState(new Date());

  const CustomCalendar = forwardRef((props, ref) => (
    <button
      className="flex justify-center modal-action-setup-button items-center focus:outline-none"
      onClick={props.onClick}
    >
      {props.name} {props.value}
    </button>
  ));

  //Action informations
  const [actionService, setActionService] = useState([]);
  const [actionSelected, setActionSelected] = useState({ params: [] });
  const [actionName, setActionName] = useState('');

  // Reaction informations
  const [reactionService, setReactionService] = useState([]);
  const [reactionSelected, setReactionSelected] = useState({ params: [] });

  const handleSubmit = async () => {
    const token = await asyncLocalStorage.getItem('access_token');

    const area = {
      actionService: actionService.nameLowercase,
      actionDes: actionSelected.name,
      actionId: actionSelected.actiondId,
      actionParams: {},
      reactionService: reactionService.nameLowercase,
      reactionDes: reactionSelected.name,
      reactionId: reactionSelected.reactiondId,
      reactionParams: {},
    };

    actionSelected.params.forEach((elem, index) => {
      area.actionParams[`${index + 1}`] = elem.server;
    });

    reactionSelected.params.forEach((elem, index) => {
      area.reactionParams[`${index + 1}`] = elem.server;
    });

    axios
      .post('http://localhost:8080/users/create-area', area, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        window.location.reload();
      });
  };

  // handle popover input
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // modal Navigation
  const [currentPage, setCurrentPage] = useState(1);
  function nextPage() {
    setCurrentPage(currentPage + 1);
  }
  function previousPage() {
    setCurrentPage(currentPage - 1);
  }

  if (currentPage === 1)
    return (
      <div className="flex flex-col">
        <ModalHeader
          description="choisissez le service relié à l’action"
          pagination="1/5"
          title="Action"
          closeAction={props.closeAction}
          backButton={false}
        ></ModalHeader>

        <div className="flex ml-5 flex-wrap">
          {services.map((service, index) => {
            if (service.actions.length > 0)
              return (
                <ModalServiceButton
                  key={index}
                  service={service}
                  nextPageFunction={nextPage}
                  setActionReactionService={setActionService}
                ></ModalServiceButton>
              );
          })}
        </div>
      </div>
    );
  else if (currentPage == 2) {
    return (
      <div className="flex flex-col h-full">
        <ModalHeader
          description="choisissez votre action"
          pagination="2/5"
          title={'Action-' + actionService.name}
          closeAction={props.closeAction}
          backButton={true}
          previousPageFunction={previousPage}
        ></ModalHeader>
        <div className="flex flex-col items-center justify-center h-full">
          {actionService.actions.map((action, index) => {
            if (action.params[0].type === 'calendar')
              return (
                <DatePicker
                  key={index}
                  selected={inputDate}
                  onChange={(date) => setInputDate(date)}
                  customInput={<CustomCalendar />}
                  popperPlacement="right"
                  dateFormat="dd/MM/yyyy"
                  name={action.name}
                  value={action.params[0].value}
                  onSelect={(value) => {
                    nextPage();
                    action.params[0].value = value.toLocaleDateString();
                    action.params[0].server = `${value.getFullYear()}-${value.getMonth() + 1
                      }-${value.getDate()}`;
                    setActionSelected(action);
                  }}
                />
              );
            else if (action.params[0].type === 'time') {
              return (
                <DatePicker
                  key={index}
                  selected={inputTime}
                  onChange={(value) => {
                    setInputTime(value);
                    nextPage();
                    action.params[0].value = value.toLocaleTimeString();
                    action.params[0].server = value.toLocaleTimeString();
                    setActionSelected(action);
                  }}
                  customInput={<CustomCalendar />}
                  popperPlacement="right"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={5}
                  timeCaption="Time"
                  dateFormat="p"
                  timeFormat="HH:mm"
                  name={action.name}
                  value={action.params[0].value}
                />
              );
            } else if (action.params[0].type == 'text')
              return (
                <div key={index} className="flex">
                  <button
                    key={index}
                    className="flex justify-center modal-action-setup-button items-center focus:outline-none"
                    onClick={(e) => {
                      handleClick(e);
                      setActionSelected(action);
                    }}
                  >
                    <span>{action.name}</span>
                  </button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <form className="flex">
                      {actionSelected.params.map((param, index) => {
                        if (param.type === 'area')
                          return (
                            <textarea
                              key={index}
                              type="text"
                              className="modal-text-input"
                              placeholder={param.name}
                              defaultValue={param.value}
                              onKeyDown={(e) => {
                                param.value = e.target.value;
                                param.server = e.target.value;
                                if (e.key == 'Enter' && e.target.value != '') {
                                  nextPage();
                                  handleClose();
                                  setActionSelected(actionSelected);
                                }
                              }}
                            />
                          );
                        else
                          return (
                            <input
                              key={index}
                              type="text"
                              className="modal-text-input py-3 px-6"
                              defaultValue={param.value}
                              placeholder={param.name}
                              onKeyDown={(e) => {
                                if (e.key == 'Enter' && e.target.value != '') {
                                  nextPage();
                                  handleClose();
                                  setActionSelected(actionSelected);
                                }
                              }}
                              onChange={(e) => {
                                param.value = e.target.value;
                                param.server = e.target.value;
                              }}
                            />
                          );
                      })}
                    </form>
                  </Popover>
                </div>
              );
            else
              return (
                <button
                  key={index}
                  className="flex justify-center modal-action-setup-button items-center focus:outline-none"
                  onClick={() => {
                    nextPage();
                    action.params[0].value = value;
                    action.params[0].server = value;
                    setActionSelected(action);
                  }}
                >
                  <span>{action.name}</span>
                </button>
              );
          })}
        </div>
      </div >
    );
  } else if (currentPage == 3) {
    return (
      <div className="flex flex-col h-full">
        <ModalHeader
          description="choisissez le service relié à la réaction"
          pagination="3/5"
          title="React"
          closeAction={props.closeAction}
          backButton={true}
          previousPageFunction={previousPage}
        ></ModalHeader>
        <span className="modal-medium-text mt-10 mb-1 ml-10">
          Selected service:{' '}
          <span className="modal-regular-text">{actionService.name}</span>
        </span>
        <span className="modal-medium-text mb-5 ml-10">
          Selected action in service: {actionSelected.name}
          <span className="modal-regular-text">
            {actionSelected.params.map((param, index) => {
              return (
                <span key={index}> {param.value}</span>
              )
            })}
          </span>
        </span>
        <div className="flex ml-5">
          {services.map((service, index) => {
            if (service.reactions.length > 0)
              return (
                <ModalServiceButton
                  key={index}
                  service={service}
                  setActionReactionService={setReactionService}
                  nextPageFunction={nextPage}
                ></ModalServiceButton>
              );
          })}
        </div>
      </div>
    );
  } else if (currentPage == 4) {
    return (
      <div className="flex flex-col h-full">
        <ModalHeader
          description="choisissez votre réaction"
          pagination="4/5"
          title={'React-' + reactionService.name}
          closeAction={props.closeAction}
          backButton={true}
          previousPageFunction={previousPage}
        ></ModalHeader>
        <div className="flex flex-col items-center justify-center h-full">
          {reactionService.reactions.map((reaction, index) => {
            if (reaction.params[0].type == 'text')
              return (
                <div key={index}>
                  <button
                    key={index}
                    className="flex justify-center modal-action-setup-button items-center focus:outline-none"
                    onClick={(e) => {
                      handleClick(e);
                      setReactionSelected(reaction);
                    }}
                  >
                    <span>{reaction.name}</span>
                  </button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <form className="flex">
                      {reactionSelected.params.map((param, index) => {
                        if (param.type === 'area')
                          return (
                            <textarea
                              key={index}
                              type="text"
                              className="modal-text-input"
                              placeholder={param.name}
                              defaultValue={param.value}
                              onKeyDown={(e) => {
                                param.value = e.target.value;
                                param.server = e.target.value;
                                if (e.key == 'Enter' && e.target.value != '') {
                                  nextPage();
                                  handleClose();
                                  setReactionSelected(reactionSelected);
                                }
                              }}
                            />
                          );
                        else
                          return (
                            <input
                              key={index}
                              type="text"
                              className="modal-text-input py-3 px-6"
                              defaultValue={param.value}
                              placeholder={param.name}
                              onKeyDown={(e) => {
                                if (e.key == 'Enter' && e.target.value != '') {
                                  nextPage();
                                  handleClose();
                                  setReactionSelected(reactionSelected);
                                }
                              }}
                              onChange={(e) => {
                                param.value = e.target.value;
                                param.server = e.target.value;
                              }}
                            />
                          );
                      })}
                    </form>
                  </Popover>
                </div>
              );
          })}
        </div>
      </div>
    );
  } else if (currentPage == 5) {
    return (
      <div className="flex flex-col h-full">
        <ModalHeader
          description=""
          pagination="5/5"
          title="Récapitulatif"
          closeAction={props.closeAction}
          backButton={true}
          previousPageFunction={previousPage}
        ></ModalHeader>
        <div
          className="flex self-center justify-between items-center"
          style={{ width: '85%', height: '90%' }}
        >
          <div className="flex flex-col">
            <div className="div flex items-center">
              <ModalServiceButton
                service={actionService}
                nextPageFunction={nextPage}
                disabled={true}
              ></ModalServiceButton>
              <div className="flex flex-col">
                <span
                  className="modal-medium-text"
                  style={{ fontSize: '23px' }}
                >
                  Action
                </span>
                <span
                  className="modal-regular-text mt-1"
                  style={{ fontSize: '16px' }}
                >
                  {actionSelected.name} {actionSelected.params.map((param, index) => {
                    return (
                      <span key={index}> {param.value}</span>
                    )
                  })}
                </span>
              </div>
            </div>
            <div className="div flex items-center">
              <ModalServiceButton
                service={reactionService}
                nextPageFunction={nextPage}
                disabled={true}
              ></ModalServiceButton>
              <div className="flex flex-col">
                <span
                  className="modal-medium-text"
                  style={{ fontSize: '23px' }}
                >
                  Reaction
                </span>
                <span
                  className="modal-regular-text mt-1"
                  style={{ fontSize: '16px' }}
                >
                  {reactionSelected.name} {reactionSelected.params.map((param, index) => {
                    return (
                      <span key={index}> {param.value}</span>
                    )
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="modal-submit-button mb-3 focus:outline-none"
              onClick={handleSubmit}
            >
              Valider
              {/* {actionSelected.params[0].name} {actionSelected.params[0].value}
              {actionSelected.params[1].name} {actionSelected.params[1].value} */}
            </button>
            <button
              className="modal-cancel-button focus:outline-none"
              onClick={props.closeAction}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateLinkModal;
