import axios from 'axios';

export default class JobSeekerCVEducationService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/educations`;

  add({ departmentName, graduationDate, jobSeekerCV: { jobSeekerCVId }, schoolName, startDate }) {
    return axios.post(`${this.controllerUrl}/add`, {
      departmentName,
      graduationDate,
      jobSeekerCV: { id: jobSeekerCVId },
      schoolName,
      startDate,
    });
  }

  delete(id) {
    return axios.delete(`${this.controllerUrl}/delete`, {
      id,
    });
  }

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  getAllByJobSeekerCV_Id(jobSeekerCVId) {
    return axios.get(`${this.controllerUrl}/getall/byjobseekercvid`, { params: { jobSeekerCVId } });
  }

  getAllByJobSeekerCV_IdOrderByGraduationDate(direction, jobSeekerCVId) {
    return axios.get(`${this.controllerUrl}/getall/byjobseekercvidorderbygraduationdate`, { params: { direction, jobSeekerCVId } });
  }

  update({ id, departmentName, graduationDate, jobSeekerCV: { jobSeekerCVId }, schoolName, startDate }) {
    return axios.post(`${this.controllerUrl}/update`, {
      id,
      departmentName,
      graduationDate,
      jobSeekerCV: { id: jobSeekerCVId },
      schoolName,
      startDate,
    });
  }
}
