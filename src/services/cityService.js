import axios from 'axios';

export default class CityService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/cities`;

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/getbyid`, { params: { id } });
  }

  getByName(name) {
    return axios.get(`${this.controllerUrl}/getbyname`, { params: { name } });
  }

  getByNameContains(name) {
    return axios.get(`${this.controllerUrl}/getbynamecontains`, { params: { name } });
  }
}
