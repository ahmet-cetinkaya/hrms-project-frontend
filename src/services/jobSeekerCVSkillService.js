import axios from 'axios';

export default class JobSeekerCVSkillService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/skills`;

  add({ jobSeekerCV: { id }, name }) {
    return axios.post(`${this.controllerUrl}/add`, { jobSeekerCV: { id }, name });
  }

  delete(id) {
    return axios.delete(`${this.controllerUrl}/delete`, { id });
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/get/byid`, { params: { id } });
  }

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  getAllByJobSeekerCV_Id(jobSeekerCVId) {
    return axios.get(`${this.controllerUrl}/getall/byjobseekercvid`, { params: { jobSeekerCVId } });
  }

  update({ id, jobSeekerCV: { jobSeekerCVId }, name }) {
    return axios.post(`${this.controllerUrl}/update`, { id, jobSeekerCV: { id: jobSeekerCVId }, name });
  }
}
