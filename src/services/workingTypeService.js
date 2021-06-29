import axios from "axios";

export default class WorkingTypeService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/workingtypes`;

  getAll() {
    return axios.get(this.controllerUrl);
  }
}
