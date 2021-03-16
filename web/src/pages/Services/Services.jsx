import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import ServiceStatus from '../../components/ServiceStatus/ServiceStatus';
import iconTwitch from '../../assets/icons/iconTwitch.svg';
import iconNotifs from '../../assets/icons/iconNotification.svg';
import iconSpotify from '../../assets/icons/iconSpotify.svg';

import servicesAdapter from '../../adapters/services/services.adapter';
import Menu from '../../components/Menu/Menu';

const images = {
  twitch: iconTwitch,
  notifs: iconNotifs,
  spotify: iconSpotify,
};

const oauthLinks = {
  twitch: 'http://localhost:8080/auth/twitch',
  spotify: 'http://localhost:8080/auth/spotify',
};

function Services(props) {
  const [services, setServices] = useState([]);

  const addNewToken = async () => {
    if (props.location.search == '' || props.location.hash == '') return;

    const service = props.location.search.substring(1);
    const token = new URLSearchParams(props.location.hash).get('#access_token');

    servicesAdapter.addNewToken(service, token, {}).then((response) => {
      window.location.replace('/services');
    });
  };

  useEffect(() => {
    addNewToken();
    servicesAdapter.getAllServices().then((response) => {
      setServices(response.data);
    });
  }, []);

  return (
    <Menu>
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex w-full flex-wrap mt-8" style={{ width: '90%' }}>
          {services &&
            services.map((element) => (
              <div className="m-5" key={element.id}>
                <ServiceStatus
                  service={
                    element.service.charAt(0).toUpperCase() +
                    element.service.slice(1)
                  }
                  modal={element.service == 'notifs' ? 'modal_notifs' : null}
                  disconnect={element.id}
                  logoLink={images[element.service]}
                  backgroundColor={element.color}
                  isConnected={element.enabled}
                  oauthLink={oauthLinks[element.service]}
                ></ServiceStatus>
              </div>
            ))}
        </div>
      </div>
    </Menu>
  );
}

export default withRouter(Services);
