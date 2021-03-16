import React, { Component } from 'react';
import './Select.css';
import { Link, withRouter } from 'react-router-dom';

import imageTechno from '../../assets/images/imageTechno.svg';

class Select extends Component {
  login() {
    this.props.history.push('/login');
  }

  register() {
    this.props.history.push('/register');
  }

  render() {
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
        <div className="flex flex-col justify-center items-center">
          <span className="area-title-righteous mb-8">area</span>
          <button
            className="select-login-input select-text-poppins my-2 focus:outline-none"
            style={{ color: '#232323' }}
            onClick={this.login.bind(this)}
          >
            se connecter
          </button>
          <button
            className="select-register-input select-text-poppins my-2 focus:outline-none"
            style={{ color: '#EEEEEE' }}
            onClick={this.register.bind(this)}
          >
            s'inscrire
          </button>
        </div>
        <footer className="form-footer">
          © 2021 - 2021 area-tek.herokuapp.com - All Rights Reserved.
        </footer>
      </div>
    );
  }
}

export default withRouter(Select);
