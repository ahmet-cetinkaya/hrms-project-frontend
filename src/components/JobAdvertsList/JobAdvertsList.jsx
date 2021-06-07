import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import JobAdvertService from '../../services/jobAdvertService';

import JobAdvertsListItem from './JobAdvertsListItem';

import './JobAdvertsList.scss';

export default function JobAdvertsList() {
  const [jobAdverts, setJobAdverts] = useState([]);

  const getAllByIsActiveOrderByCreatedAtByForList = useCallback(async () => {
    const jobAdvertService = new JobAdvertService();
    setJobAdverts((await jobAdvertService.getAllByIsActiveOrderByCreatedAtByForList()).data.data);
  }, []);

  useEffect(() => getAllByIsActiveOrderByCreatedAtByForList(), [getAllByIsActiveOrderByCreatedAtByForList]);

  return (
    <div className='p-4'>
      {jobAdverts.length > 0 && (
        <>
          <div className='text-center mb-5'>
            <h1 className='text-secondary fw-bold'>
              Featured Jobs<span className='text-primary'>.</span>
            </h1>
            <p>Find your dream job.</p>
          </div>

          <div className='row justify-content-center mb-5'>
            {jobAdverts.map((jobAdvert, index) => (
              <JobAdvertsListItem key={index} jobAdvert={jobAdvert} />
            ))}
          </div>
          <div className='text-center'>
            <Link to='' className='btn btn-primary rounded shadow'>
              Browse All
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
