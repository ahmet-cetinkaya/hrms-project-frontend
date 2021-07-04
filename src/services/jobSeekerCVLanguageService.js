import axios from "axios";

export default class JobSeekerCVLanguageService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/languages`;

  add({ jobSeekerCV, language, level }) {
    return axios.post(this.controllerUrl, {
      jobSeekerCV,
      language,
      level,
    });
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

  update({
    id,
    jobSeekerCV: { jobSeekerCVId },
    language: { languageId },
    level,
  }) {
    return axios.put(this.controllerUrl, {
      id,
      jobSeekerCV: { id: jobSeekerCVId },
      language: { id: languageId },
      level,
    });
  }
}
