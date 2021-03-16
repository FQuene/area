import React, { Component, useEffect, useState } from 'react';

import AuthAdapter from '../../adapters/auth/auth.adapter.js';
import { withRouter, useHistory, Link } from 'react-router-dom';

import imageTechno from '../../assets/images/imageTechno.svg';
import './Register.css';

function Register() {
  //
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [creationError, setCreationError] = useState(false);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    AuthAdapter.register('normal', email, username, password).then((response) =>
      response == 'ok'
        ? history.push('/login', { newAccount: true })
        : setCreationError(true),
    );
  };

  const error = () => {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 w-full text-center"
        role="alert"
      >
        <strong className="font-bold">Erreur: </strong>
        <span className="block sm:inline">Email/Identifiant utilisés</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    );
  };

  return (
    <div
      className="flex justify-center"
      style={{ height: '100vh', width: '100%', backgroundColor: '#272635' }}
    >
      {/* <img
          alt="imageTechno"
          src={imageTechno}
          className="flex form-techno-image"
        ></img> */}
      <div
        className="flex flex-col justify-center items-center"
        style={{ width: '300px' }}
      >
        <span className="area-title-righteous mb-8">area</span>
        {creationError ? error() : null}
        <form
          onSubmit={(e) => submit(e)}
          className="flex flex-col "
          style={{ width: '100%' }}
        >
          <input
            type="email"
            placeholder="email"
            className="focus:outline-none bg-transparent text-center form-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <hr
            className="mb-4 mt-2"
            style={{ borderColor: 'rgba(244, 211, 94, 0.25)', width: '100%' }}
          ></hr>
          <input
            placeholder="identifiant"
            className="focus:outline-none bg-transparent text-center form-input"
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <hr
            className="mb-4 mt-2"
            style={{ borderColor: 'rgba(244, 211, 94, 0.25)', width: '100%' }}
          ></hr>
          <input
            type="password"
            placeholder="mot de passe"
            className="focus:outline-none bg-transparent text-center form-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <hr
            className="mb-4 mt-2"
            style={{ borderColor: 'rgba(244, 211, 94, 0.25)' }}
          ></hr>
          <div className="flex justify-center">
            <button
              type="submit"
              className="register-button-connection login-text-poppins mt-4 focus:outline-none"
              style={{ color: '#EEEEEE' }}
            >
              s'inscrire
            </button>
          </div>
        </form>
        <Link to="/login" className="form-link mt-5">
          se connecter
        </Link>
      </div>
      <footer className="form-footer">
        © 2021 - 2021 area-tek.herokuapp.com - All Rights Reserved.
      </footer>
    </div>
  );
}

export default withRouter(Register);
