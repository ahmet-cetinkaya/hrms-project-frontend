import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import JobSeekerCVImageService from "../../services/jobSeekerCVImageService";
import JobSeekerCVWebSiteService from "../../services/jobSeekerCVWebSiteService";
import JobSeekerCVSkillService from "../../services/jobSeekerCVSkillService";

import defaultPersonImage from "../../assets/images/default-person-image.jpg";

export default function CandidatesListItem({ jobSeekerCV }) {
  const [imageUrl, setImageUrl] = useState(defaultPersonImage);
  const [websites, setWebsites] = useState([]);
  const [skills, setSkills] = useState([]);

  const getImageUrl = useCallback(async () => {
    const jobSeekerCVImageService = new JobSeekerCVImageService(),
      result = await jobSeekerCVImageService.getAllByJobSeekerCV_Id(
        jobSeekerCV.id
      );
    if (result.data.success && result.data.data.length > 0)
      setImageUrl(result.data.data[0].url);
  }, [jobSeekerCV.id]);

  const getAllWebSites = useCallback(async () => {
    const jobSeekerCVWebSiteService = new JobSeekerCVWebSiteService();
    setWebsites(
      (await jobSeekerCVWebSiteService.getAllByJobSeekerCV_Id(jobSeekerCV.id))
        .data.data
    );
  }, [jobSeekerCV.id]);

  const getAllSkills = useCallback(async () => {
    const jobSeekerCVSkillService = new JobSeekerCVSkillService();
    setSkills(
      (await jobSeekerCVSkillService.getAllByJobSeekerCV_Id(jobSeekerCV.id))
        .data.data
    );
  }, [jobSeekerCV.id]);

  useEffect(() => {
    getImageUrl();
    getAllWebSites();
    getAllSkills();
  }, [getImageUrl, getAllWebSites, getAllSkills]);

  return (
    <div className='col-md-4'>
      <div className='job-seeker-item p-4 m-5 mt-0 mb-5 border rounded-2 shadow bg-white'>
        <div className='text-center'>
          <div>
            <img
              src={imageUrl}
              className='rounded-circle'
              alt={`${jobSeekerCV.jobSeeker.firstName} ${jobSeekerCV.jobSeeker.lastName}`}
              height='125'
            />
            <div className='fw-bold fs-4'>
              {jobSeekerCV.jobSeeker.firstName} {jobSeekerCV.jobSeeker.lastName}
            </div>
          </div>
          <div>
            {websites
              .slice(0, 3)
              .map(({ address, webSite: { name: websiteName } }, index) => (
                <a
                  key={index}
                  href={address}
                  target='_blank'
                  rel='noreferrer'
                  className='link-secondary me-3'
                >
                  <i className={`bi bi-${websiteName} fs-4`}></i>
                </a>
              ))}
          </div>
          <div className='mt-3'>
            {skills.slice(0, 2).map(({ name }, index) => (
              <span
                key={index}
                className='badge me-2 fw-light rounded-pill bg-light text-primary'
              >
                {name}
              </span>
            ))}
          </div>

          <div className='mt-3'>
            <Link className='btn btn-primary rounded-2 py-2 me-3' to='/'>
              View Profile
            </Link>

            <Link className='btn text-muted rounded-2 py-2' to='/'>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
