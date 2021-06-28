import axios from "axios";

export default class JobAdvertService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobadverts`;

  add({
    applicationDeadline,
    city: { cityId },
    description,
    employer: { employerId },
    jobPosition: { jobPositionId },
    maxSalary,
    minSalary,
    numberOfOpenPositions,
  }) {
    return axios.post(`${this.controllerUrl}`, {
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
    return axios.put(`${this.controllerUrl}/disablebyid`, {
      id,
    });
  }

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  getAllByIsActive(isActive = true) {
    return axios.get(`${this.controllerUrl}/byisactive`, {
      params: {
        isActive,
      },
    });
  }

  getAllByIsActiveForList(isActive = true) {
    return axios.get(`${this.controllerUrl}/forlist/byisactive`, {
      params: {
        isActive,
      },
    });
  }

  getAllByIsActiveAndEmployer_CompanyNameForList(companyName, isActive = true) {
    return axios.get(
      `${this.controllerUrl}/forlist/byisactiveandemployercompanyname`,
      {
        params: {
          companyName,
          isActive,
        },
      }
    );
  }

  getAllByIsActiveOrderByCreatedAtByForList(
    isActive = true,
    direction = "DESC"
  ) {
    return axios.get(
      `${this.controllerUrl}/forlist/byisactiveorderbycreatedatby`,
      {
        params: {
          direction,
          isActive,
        },
      }
    );
  }

  update({
    id,
    applicationDeadline,
    city: { cityId },
    description,
    employer: { employerId },
    jobPosition: { jobPositionId },
    maxSalary,
    minSalary,
    numberOfOpenPositions,
  }) {
    return axios.put(this.controllerUrl, {
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
