import React, { useCallback, useEffect, useMemo, useState } from "react";

import JobSeekerService from "../../services/jobSeekerService";
import { Link } from "react-router-dom";

export default function JobAdvertListItem({ jobAdvert }) {
  const [jobSeekersFavoriteJobAdvert, setJobSeekersFavoriteJobAdvert] = useState(null);

  const jobSeekerService = useMemo(() => new JobSeekerService(), []),
    getByJobSeekerIdAndJobAdvertId = useCallback(async () => {
      const user = { id: 1 }, //TODO Login Redux
        result = await jobSeekerService.getByJobSeekerIdAndJobAdvertId(user.id, jobAdvert.id);
      if (result.data.success) setJobSeekersFavoriteJobAdvert(result.data.data);
    }, [jobSeekerService, jobAdvert.id]),
    favorite = async () => {
      const user = { id: 1 }, //TODO Login Redux
        result = await jobSeekerService.favoriteJobAdvert({ jobSeeker: user, jobAdvert });
      if (result.data.success) getByJobSeekerIdAndJobAdvertId();
    },
    undoFavorite = async () => {
      const result = await jobSeekerService.undoFavoriteJobAdvert(jobSeekersFavoriteJobAdvert.id);
      if (result.data.success) setJobSeekersFavoriteJobAdvert(null);
    };

  useEffect(() => getByJobSeekerIdAndJobAdvertId(), [getByJobSeekerIdAndJobAdvertId]);

  return (
    <div className='col-md-5 px-4 m-3'>
      <div className='job-item p-4 border rounded-2  shadow'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <i className='bi bi-briefcase fs-1 me-3 text-muted' />
            <div>
              <div className='fw-bold fs-5'>{jobAdvert.title}</div>
              <div className='text-primary fw-bold me-1'>
                Open Positions
                <span className='badge bg-secondary mx-1'>{jobAdvert.numberOfOpenPositions}</span>
                <span className='badge bg-secondary'>{jobAdvert.workingTimeName}</span>
              </div>
              <div className='fw-light'>
                {jobAdvert.companyName} - {jobAdvert.cityName}
              </div>
            </div>
          </div>
          <div className='text-end align-text-bottom'>
            <div className='text-primary fw-bold'>Salary</div>
            <div className='text-secondary'>
              {jobAdvert.minSalary} - {jobAdvert.maxSalary}₺
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center mt-3'>
          <div>
            <div className='text-muted m-0'>
              Posted at {new Date(...jobAdvert.createdAt).toDateString()}
            </div>
            <div className='text-muted'>
              Deadline at {new Date(...jobAdvert.applicationDeadline).toDateString()}
            </div>
          </div>
          <div>
            {jobSeekersFavoriteJobAdvert ? (
              <button type='button' className='btn shadow-none' onClick={() => undoFavorite()}>
                <i className='bi bi-star-fill'></i>
              </button>
            ) : (
              <button type='button' className='btn shadow-none' onClick={() => favorite()}>
                <i className='bi bi-star text-secondary'></i>
              </button>
            )}
            <Link className='btn btn-primary rounded' to='/'>
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
