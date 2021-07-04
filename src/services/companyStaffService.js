import axios from "axios";

export default class CompanyStaffService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/companystaffs`;

  getById(id) {
    return axios.get(`${this.controllerUrl}/byid`, { params: { id } });
  }

  updateByUser({ id, firstName, lastName, password }) {
    return axios.put(`${this.controllerUrl}/byuser`, {
      id,
      firstName,
      lastName,
      password,
    });
  }
}
