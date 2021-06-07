import axios from 'axios';

export default class EmployerService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/employers`;

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  register({ companyName, confirmPassword, corporateEmail, email, password, phone, website }) {
    return axios.post(`${this.controllerUrl}/register`, {
      companyName,
      confirmPassword,
      corporateEmail,
      email,
      password,
      phone,
      website,
    });
  }
}
