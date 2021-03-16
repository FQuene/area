import Global from '../global/global';
import { asyncLocalStorage } from '../global/asyncLocalStorage';

class UserAdapter extends Global {
  constructor() {
    super();
  }

  async getUsername() {
    const token = await asyncLocalStorage.getItem('access_token');
    const result = await this.server.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }
}

export default new UserAdapter();
