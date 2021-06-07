import axios from 'axios';

export default class JobSeekerCVLanguageService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/languages`;

  add({ jobSeekerCV: { jobSeekerCVId }, language: { languageId }, level }) {
    return axios.post(`${this.controllerUrl}/add`, { jobSeekerCV: { id: jobSeekerCVId }, language: { id: languageId }, level });
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

  update({ id, jobSeekerCV: { jobSeekerCVId }, language: { languageId }, level }) {
    return axios.post(`${this.controllerUrl}/update`, {
      id,
      jobSeekerCV: { id: jobSeekerCVId },
      language: { id: languageId },
      level,
    });
  }
}
