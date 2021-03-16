import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Menu.css';

import UserAdapter from '../../adapters/user/user.adapter';
import AuthAdapter from '../../adapters/auth/auth.adapter';

function Menu({ children }) {
  const [username, setUsername] = useState();
  const history = useHistory();

  useEffect(() => {
    UserAdapter.getUsername().then((response) => {
      setUsername(response.username);
    });
  }, []);

  return (
    <div
      className="flex flex-col items-center h-full"
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#272635',
        overflow: 'auto',
      }}
    >
      <div className="flex" style={{ width: '95%' }}>
        <div
          className="flex justify-between w-full"
          style={{ marginTop: '1%' }}
        >
          <div className="flex items-center">
            <span className="home-logo-area mr-7 mb-2 cursor-pointer">
              area
            </span>
            <a
              className="home-poppins-text mx-5 hover:underline cursor-pointer"
              onClick={() => history.push('/home')}
            >
              areas
            </a>
            <a
              className="home-poppins-text mx-5 hover:underline cursor-pointer"
              onClick={() => history.push('/services')}
            >
              services
            </a>
            <a
              className="home-poppins-text mx-5 hover:underline cursor-pointer"
              onClick={() =>
                AuthAdapter.logout().then(window.location.reload())
              }
            >
              déconnexion
            </a>
          </div>
          <div className="flex items-center">
            <span className="home-poppins-medium-text">{username}</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Menu;
