import axios from "axios";

export default class WorkingTimeService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/workingtimes`;

  getAll() {
    return axios.get(this.controllerUrl);
  }
}
