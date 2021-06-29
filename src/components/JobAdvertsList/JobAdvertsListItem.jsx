import { Link } from "react-router-dom";
import React from "react";

export default function JobAdvertListItem({ jobAdvert }) {
  return (
    <div className='col-md-5 px-4 m-3'>
      <div className='job-item p-4 border rounded-2  shadow'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex align-items-center'>
            <i className='bi bi-briefcase fs-1 me-3 text-muted' />
            <span>
              <div className='fw-light'>{jobAdvert.companyName}</div>
              <div className='fw-bold fs-5'>{jobAdvert.title}</div>
              <div className='text-primary fw-bold'>
                Open Positions{" "}
                <span className='badge bg-secondary ms-1'>
                  {jobAdvert.numberOfOpenPositions}
                </span>
              </div>
            </span>
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
              Posted at {new Date(jobAdvert.createdAt).toDateString()}
            </div>
            <div className='text-muted'>
              Deadline at{" "}
              {new Date(jobAdvert.applicationDeadline).toDateString()}
            </div>
          </div>
          <Link className='btn btn-primary rounded' to='/'>
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
