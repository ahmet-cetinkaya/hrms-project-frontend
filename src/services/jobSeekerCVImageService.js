import axios from "axios";

export default class JobSeekerCVImageService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/images`;

  addAndSave(file, jobSeekerCVId) {
    const data = new FormData();
    data.append("file", file);
    return axios.post(`${this.controllerUrl}/addandsave`, data, {
      headers: { "Content-Type": "multipart/form-data" },
      params: { jobSeekerCVId },
    });
  }

  delete(id) {
    return axios.delete(this.controllerUrl, { id });
  }

  getAll() {
    return axios.get(this.controllerUrl);
  }

  getAllByJobSeekerCV_Id(jobSeekerCVId) {
    return axios.get(`${this.controllerUrl}/byjobseekercvid`, {
      params: { jobSeekerCVId },
    });
  }
}
