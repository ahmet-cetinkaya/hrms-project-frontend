import axios from "axios";

export default class CityService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/cities`;

  getAll() {
    return axios.get(this.controllerUrl);
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/byid`, { params: { id } });
  }

  getByName(name) {
    return axios.get(`${this.controllerUrl}/byname`, { params: { name } });
  }

  getByNameContains(name) {
    return axios.get(`${this.controllerUrl}/bynamecontains`, {
      params: { name },
    });
  }
}
