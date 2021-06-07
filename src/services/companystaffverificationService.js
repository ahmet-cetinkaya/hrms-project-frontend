import axios from 'axios';

export default class CompanystaffverificationService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/companystaffverifications`;

  verify(userId) {
    return axios.get(`${this.controllerUrl}/companystaffverifications`, { params: { userId } });
  }
}
