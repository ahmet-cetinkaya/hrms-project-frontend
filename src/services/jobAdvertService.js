import axios from 'axios';

export default class JobAdvertService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobadverts`;

  add({ applicationDeadline, city: { cityId }, description, employer: { employerId }, jobPosition: { jobPositionId }, maxSalary, minSalary, numberOfOpenPositions }) {
    return axios.post(`${this.controllerUrl}/add`, {
      applicationDeadline,
      city: { id: cityId },
      description,
      employer: { id: employerId },
      jobPosition: { id: jobPositionId },
      maxSalary,
      minSalary,
      numberOfOpenPositions,
    });
  }

  disableById(id) {
    return axios.post(`${this.controllerUrl}/update/disablebyid`, {
      id,
    });
  }

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  getAllByIsActiveForList(isActive = true) {
    return axios.get(`${this.controllerUrl}/getall/forlist/byisactive`, {
      params: {
        isActive,
      },
    });
  }

  getAllByIsActiveAndEmployer_CompanyNameForList(companyName, isActive = true) {
    return axios.get(`${this.controllerUrl}/getall/forlist/byisactiveandemployercompanyname`, {
      params: {
        companyName,
        isActive,
      },
    });
  }

  getAllByIsActiveOrderByCreatedAtByForList(direction = 'DESC', isActive = true) {
    return axios.get(`${this.controllerUrl}/getall/forlist/byisactiveorderbycreatedatby`, {
      params: {
        direction,
        isActive,
      },
    });
  }

  update({ id, applicationDeadline, city: { cityId }, description, employer: { employerId }, jobPosition: { jobPositionId }, maxSalary, minSalary, numberOfOpenPositions }) {
    return axios.post(`${this.controllerUrl}/update`, {
      id,
      applicationDeadline,
      city: { id: cityId },
      description,
      employer: { id: employerId },
      jobPosition: { id: jobPositionId },
      maxSalary,
      minSalary,
      numberOfOpenPositions,
    });
  }
}
