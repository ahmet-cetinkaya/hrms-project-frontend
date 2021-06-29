import axios from "axios";

export default class WebSiteService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/websites`;

  add({ name }) {
    return axios.post(this.controllerUrl, { name });
  }

  delete(id) {
    return axios.post(this.controllerUrl, { id });
  }

  getAll() {
    return axios.get(this.controllerUrl);
  }

  update({ id, name }) {
    return axios.put(this.controllerUrl, { id, name });
  }
}
