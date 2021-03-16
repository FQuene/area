/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */

import React, { useEffect, useState } from 'react';

/* ---------------------------------- Libs ---------------------------------- */
import { Link, withRouter, useHistory } from 'react-router-dom';

/* ---------------------------------- Libs ---------------------------------- */

/* --------------------------------- Images --------------------------------- */
import imageTechno from '../../assets/images/imageTechno.svg';
import logoGoogle from '../../assets/images/logoGoogle.svg';
/* --------------------------------- Images --------------------------------- */

/* ----------------------------------- CSS ---------------------------------- */
import './Login.css';
/* ----------------------------------- CSS ---------------------------------- */

/* -------------------------------- Adapters -------------------------------- */
import AuthAdapter from '../../adapters/auth/auth.adapter';
/* -------------------------------- Adapters -------------------------------- */

/* -------------------------------------------------------------------------- */
const clientId =
  '590303006550-th3ttq2s0gtjfbbuu8hkuuueu64sha2c.apps.googleusercontent.com';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectFailed, setConnectFailed] = useState(false);
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    AuthAdapter.login(email, password).then((response) => {
      response == 'failed' ? setConnectFailed(true) : history.push('/home');
    });
  };

  const googleLogin = () => {
    AuthAdapter.googleLogin();
  };

  const getGogoleProfile = () => {
    AuthAdapter.googleProfile();
  };

  useEffect(() => {
    AuthAdapter.logout();
  }, []);

  const alertNewAccount = () => {
    return (
      <div
        className="bg-green-50 border-t-4 border-green-300 rounded-b text-teal-900 mb-6 px-4 py-3 shadow-md w-full"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Votre compte est prêt.</p>
            <p className="text-sm">Connectez-vous !</p>
          </div>
        </div>
      </div>
    );
  };

  const alertConnectFailed = () => {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 w-full text-center"
        role="alert"
      >
        <strong className="font-bold">Erreur: </strong>
        <span className="block sm:inline">Identifiant/Mdp incorrect </span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    );
  };

  return (
    <div
      className="flex justify-center"
      style={{ height: '100vh', width: '100%', backgroundColor: '#272635' }}
    >
      <div
        className="flex flex-col justify-center items-center"
        style={{ width: '300px' }}
      >
        <span className="area-title-righteous mb-8">area</span>
        {props.location.state?.newAccount == true ? alertNewAccount() : null}
        {connectFailed == true ? alertConnectFailed() : null}

        <form
          className="flex flex-col "
          style={{ width: '100%' }}
          onSubmit={(e) => login(e)}
        >
          <input
            placeholder="email"
            type="email"
            className="focus:outline-none bg-transparent text-center form-input"
            onChange={(e) => setEmail(e.target.value)}
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
          <div className="flex justify-between">
            <button
              type="submit"
              className="login-button-connection login-text-poppins mt-4 focus:outline-none"
              style={{ color: '#EEEEEE' }}
            >
              connexion
            </button>
            <button
              className="flex button-google login-text-poppins mt-4 focus:outline-none justify-center items-center hover:bg-black"
              type="button"
              onClick={googleLogin}
            >
              <img alt="logoGoogle" src={logoGoogle}></img>
            </button>
          </div>
        </form>
        <Link to="/register" className="form-link mt-5">
          s'inscrire
        </Link>
      </div>
      <footer className="form-footer">
        © 2021 - 2021 area-tek.herokuapp.com - All Rights Reserved.
      </footer>
    </div>
  );
}

export default withRouter(Login);
