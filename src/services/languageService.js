import axios from "axios";

export default class LanguageService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/languages`;

  getAll() {
    return axios.get(this.controllerUrl);
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/byid`, { params: { id } });
  }
}
