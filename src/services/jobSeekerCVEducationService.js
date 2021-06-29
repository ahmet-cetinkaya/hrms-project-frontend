import axios from "axios";

export default class JobSeekerCVEducationService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers/cvs/educations`;

  add({
    departmentName,
    graduationDate,
    jobSeekerCV: { jobSeekerCVId },
    schoolName,
    startDate,
  }) {
    return axios.post(this.controllerUrl, {
      departmentName,
      graduationDate,
      jobSeekerCV: { id: jobSeekerCVId },
      schoolName,
      startDate,
    });
  }

  delete(id) {
    return axios.delete(this.controllerUrl, {
      id,
    });
  }

  getAll() {
    return axios.get(this.controllerUrl);
  }

  getAllByJobSeekerCV_Id(jobSeekerCVId) {
    return axios.get(`${this.controllerUrl}/byjobseekercvid`, {
      params: { jobSeekerCVId },
    });
  }

  getAllByJobSeekerCV_IdOrderByGraduationDate(direction, jobSeekerCVId) {
    return axios.get(
      `${this.controllerUrl}/byjobseekercvidorderbygraduationdate`,
      { params: { direction, jobSeekerCVId } }
    );
  }

  update({
    id,
    departmentName,
    graduationDate,
    jobSeekerCV: { jobSeekerCVId },
    schoolName,
    startDate,
  }) {
    return axios.put(this.controllerUrl, {
      id,
      departmentName,
      graduationDate,
      jobSeekerCV: { id: jobSeekerCVId },
      schoolName,
      startDate,
    });
  }
}
