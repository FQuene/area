import Global from '../global/global';
import Cookies from 'js-cookie';
import { asyncLocalStorage } from '../global/asyncLocalStorage';

class AuthAdapter extends Global {
  isAuthentified = false;

  constructor() {
    super();
  }

  async register(type, email, username, password) {
    const result = await this.server
      .post('/auth/register', {
        accType: type,
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error.response));

    return result.status.code === 409 ? 'conflict' : 'ok';
  }

  async login(username, password) {
    return await this.server
      .post('/auth/login', { email: username, password: password })
      .then(async (response) => {
        await asyncLocalStorage.setItem(
          'access_token',
          response.data.access_token,
        );
        return 'succeed';
      })
      .catch((error) => {
        return 'failed';
      });
  }

  async googleLogin() {
    try {
      window.location.href = `${this.baseUrl}/auth/google`; //to open new page
    } catch (error) {}
  }

  async googleProfile() {
    this.server.get('/auth/callback').then((response) => {});
  }

  async logout() {
    await asyncLocalStorage.removeItem('access_token');
    Cookies.remove('jwt');
  }

  async verify() {
    let accessToken = await asyncLocalStorage.getItem('access_token');

    if (accessToken == null) {
      accessToken = await Cookies.get('jwt');
      if (accessToken == undefined || null) return false;
      await asyncLocalStorage.setItem('access_token', accessToken);
    }

    const isTokenValid = await this.server
      .get(
        '/auth/profile',
        { headers: { Authorization: `Bearer ${accessToken}` } },
        (response) => {},
      )
      .catch((error) => {
        asyncLocalStorage.removeItem('access_token');
        return error.response;
      });

    if (isTokenValid.status == 404) this.isAuthentified = false;
    else if (isTokenValid.status == 200) this.isAuthentified = true;
    else return console.log(isTokenValid.status);
  }
}

export default new AuthAdapter();
