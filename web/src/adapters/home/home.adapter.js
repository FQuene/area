import Global from '../global/global';
import { asyncLocalStorage } from '../global/asyncLocalStorage';
import Home from '../../pages/Home/Home';

class HomeAdapter extends Global {
  constructor() {
    super();
  }

  async getAccessToken() {
    const accessToken = await asyncLocalStorage.getItem('access_token');
    return accessToken;
  }

  async getAreas() {
    const access_token = await this.getAccessToken();

    return this.server
      .get('/users/areas', {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .catch((error) => console.log(error));
  }

  async deleteArea(id) {
    const access_token = await this.getAccessToken();
    return this.server
      .delete(`/users/delete-area/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .catch((error) => console.log(error));
  }

  async changeAreaOnOff(id, status) {
    const access_token = await this.getAccessToken();

    return this.server
      .post(
        '/users/area-on-off',
        { id: id, status: status },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      )
      .catch((error) => console.log(error));
  }
}

export default new HomeAdapter();
