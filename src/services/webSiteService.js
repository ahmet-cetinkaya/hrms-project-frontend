import axios from 'axios';

export default class WebSiteService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/websites`;

  add({ name }) {
    return axios.post(`${this.controllerUrl}/add`, { name });
  }

  delete(id) {
    return axios.post(`${this.controllerUrl}/delete`, { id });
  }

  getByName(name) {
    return axios.get(`${this.controllerUrl}/getbyname`, { params: { name } });
  }

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  update({ id, name }) {
    return axios.post(`${this.controllerUrl}/update`, { id, name });
  }
}
