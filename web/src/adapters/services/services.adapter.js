import { get } from 'js-cookie';
import { asyncLocalStorage } from '../global/asyncLocalStorage';
import Global from '../global/global';

class ServicesAdapter extends Global {
  constructor() {
    super();
  }

  async getAccessToken() {
    const accessToken = await asyncLocalStorage.getItem('access_token');
    return accessToken;
  }

  async getAllServices() {
    const access_token = await this.getAccessToken();

    return this.server.get('/users/get-tokens-status', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }

  async addNewToken(service, token, params) {
    const access_token = await this.getAccessToken();

    const data = {
      service: service,
      token: token,
      params: params,
    };

    return this.server.post('/users/add-token', data, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }

  async removeToken(id) {
    const access_token = await this.getAccessToken();

    return this.server.delete('/users/reset-token/' + id, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
  }
}

export default new ServicesAdapter();
