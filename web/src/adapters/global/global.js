import axios from 'axios';
class Global {
  baseUrl = 'http://localhost:8080';
  server = axios.create({ baseURL: this.baseUrl });
}

export default Global;
