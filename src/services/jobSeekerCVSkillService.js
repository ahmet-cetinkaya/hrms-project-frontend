import axios from "axios";

export default class JobSeekerCVSkillService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/skills`;

  add({ jobSeekerCV: { id }, name }) {
    return axios.post(this.controllerUrl, { jobSeekerCV: { id }, name });
  }

  delete(id) {
    return axios.delete(this.controllerUrl, { params: { id } });
  }

  getById(id) {
    return axios.get(`${this.controllerUrl}/byid`, { params: { id } });
  }

  getAll() {
    return axios.get(this.controllerUrl);
  }

  getAllByJobSeekerCV_Id(jobSeekerCVId) {
    return axios.get(`${this.controllerUrl}/byjobseekercvid`, {
      params: { jobSeekerCVId },
    });
  }

  update({ id, jobSeekerCV: { jobSeekerCVId }, name }) {
    return axios.put(this.controllerUrl, {
      id,
      jobSeekerCV: { id: jobSeekerCVId },
      name,
    });
  }
}
