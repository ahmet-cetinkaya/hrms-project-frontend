import axios from "axios";

export default class JobSeekerCVService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs`;

  add({ coverLetter, jobSeeker }) {
    return axios.post(this.controllerUrl, { coverLetter, jobSeeker });
  }

  delete({ id }) {
    return axios.delete(this.controllerUrl, { id });
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/byid`, { params: { id } });
  }

  getByJobSeeker_Id(jobSeekerId) {
    return axios.get(`${this.controllerUrl}/byjobseekerid`, {
      params: { jobSeekerId },
    });
  }

  getAll() {
    return axios.get(this.controllerUrl);
  }

  update({ id, coverLetter, jobSeeker }) {
    return axios.put(this.controllerUrl, { id, coverLetter, jobSeeker });
  }
}
