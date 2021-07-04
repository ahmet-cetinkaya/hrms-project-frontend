import axios from "axios";

export default class JobSeekerService {
  controllerUrl = `${process.env.REACT_APP_API_URL}/jobseekers`;

  getAll() {
    return axios.get(this.controllerUrl);
  }

  register({ birthDate, confirmPassword, email, firstName, identityNumber, lastName, password }) {
    return axios.post(`${this.controllerUrl}/register`, {
      birthDate,
      confirmPassword,
      email,
      firstName,
      identityNumber,
      lastName,
      password,
    });
  }

  getByJobSeekerIdAndJobAdvertId(jobSeekerId, jobAdvertId) {
    return axios.get(`${this.controllerUrl}/favorite/jobadvert/byjobseekeridandjobadvertid`, {
      params: {
        jobSeekerId,
        jobAdvertId,
      },
    });
  }

  favoriteJobAdvert({ jobSeeker, jobAdvert }) {
    return axios.post(`${this.controllerUrl}/favorite/jobadvert`, {
      jobSeeker,
      jobAdvert,
    });
  }

  undoFavoriteJobAdvert(jobSeekersFavoriteJobAdvertId) {
    return axios.delete(`${this.controllerUrl}/favorite/jobadvert`, {
      params: { jobSeekersFavoriteJobAdvertId },
    });
  }
}
