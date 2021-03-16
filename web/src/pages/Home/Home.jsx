import React, { Component, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import HomeBody from './HomeBody/HomeBody';
import Menu from '../../components/Menu/Menu';

function Home() {
  return (
    <Menu>
      <HomeBody />
    </Menu>
  );
}

export default withRouter(Home);
