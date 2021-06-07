import axios from 'axios';

export default class JobSeekerCV {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs`;

  add({ coverLetter, jobSeeker }) {
    return axios.post(`${this.controllerUrl}/add`, { coverLetter, jobSeeker });
  }

  delete({ id }) {
    return axios.delete(`${this.controllerUrl}/delete`, { id });
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/get/byid`, { params: { id } });
  }

  getByJobSeeker_Id(jobSeekerId) {
    return axios.get(`${this.controllerUrl}/get/byjobseekerid`, { params: { jobSeekerId } });
  }

  getAll() {
    return axios.get(`${this.controllerUrl}/getall`);
  }

  update({ id, coverLetter, jobSeeker }) {
    return axios.post(`${this.controllerUrl}/update`, { id, coverLetter, jobSeeker });
  }
}
