import axios from 'axios';

export default class JobSeekerCVExperienceService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/experiences`;

  add({ jobPosition: { jobPositionId }, jobSeekerCV: { jobSeekerCVId }, workplaceName, startDate, quitDate }) {
    return axios.post(`${this.controllerUrl}/add`, {
      jobPosition: { id: jobPositionId },
      jobSeekerCV: { id: jobSeekerCVId },
      workplaceName,
      startDate,
      quitDate,
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

  getAllByJobSeekerCV_IdOrderByQuitDate(direction, jobSeekerCVId) {
    return axios.get(`${this.controllerUrl}/getall/byjobseekercvidorderbyquitdate`, { params: { direction, jobSeekerCVId } });
  }

  update({ id, jobPosition: { jobPositionId }, jobSeekerCV: { jobSeekerCVId }, workplaceName, startDate, quitDate }) {
    return axios.post(`${this.controllerUrl}/update`, {
      id,
      jobPosition: { id: jobPositionId },
      jobSeekerCV: { id: jobSeekerCVId },
      workplaceName,
      startDate,
      quitDate,
    });
  }
}
