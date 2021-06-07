import axios from 'axios';

export default class JobPositionService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobpositions`;

  add({ title }) {
    return axios.post(`${this.controllerUrl}/add`, {
      title,
    });
  }

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }
}
