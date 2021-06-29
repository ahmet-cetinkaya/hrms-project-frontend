import axios from "axios";

export default class JobSeekerCVSkillService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/websites`;

  add({ address, jobSeekerCV: { jobSeekerCVId }, webSite: { webSiteId } }) {
    return axios.post(this.controllerUrl, {
      address,
      jobSeekerCV: { id: jobSeekerCVId },
      webSite: { id: webSiteId },
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

  update({
    id,
    address,
    jobSeekerCV: { jobSeekerCVId },
    webSite: { webSiteId },
  }) {
    return axios.put(this.controllerUrl, {
      id,
      address,
      jobSeekerCV: { id: jobSeekerCVId },
      webSite: { id: webSiteId },
    });
  }
}
