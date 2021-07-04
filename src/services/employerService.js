import axios from "axios";

export default class EmployerService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/employers`;

  getAll() {
    return axios.get(this.controllerUrl);
  }

  getLastUpdateByUserId(employerId) {
    return axios.get(`${this.controllerUrl}/update/byuserid/last`, {
      params: { employerId },
    });
  }

  getAllUpdateByIsApprovedAndIsDeleted(isApproved = false, isDeleted = false) {
    return axios.get(`${this.controllerUrl}/update/byisapprovedandisdeleted`, {
      params: { isApproved, isDeleted },
    });
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/byid`, { params: { id } });
  }

  updateByUser({ id, companyName, website, corporateEmail, phone, password }) {
    return axios.put(`${this.controllerUrl}/byuser`, {
      id,
      companyName,
      website,
      corporateEmail,
      phone,
      password,
    });
  }

  verifyUpdate(employerUpdateId) {
    return axios.put(`${this.controllerUrl}/verify/update`, null, {
      params: { employerUpdateId },
    });
  }

  register({
    companyName,
    confirmPassword,
    corporateEmail,
    email,
    password,
    phone,
    website,
  }) {
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
