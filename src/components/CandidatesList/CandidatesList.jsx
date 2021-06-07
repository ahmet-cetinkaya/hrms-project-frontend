import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import JobSeekerCVService from '../../services/jobSeekerCVService';

import CandidatesListItem from './CandidatesListItem';

import './CandidatesList.scss';

export default function CandidatesList() {
  const [jobSeekersCVs, setJobSeekersCVs] = useState([]);

  const getAll = useCallback(async () => {
    const jobSeekerCVService = new JobSeekerCVService();
    setJobSeekersCVs((await jobSeekerCVService.getAll()).data.data);
  }, []);

  useEffect(() => getAll(), [getAll]);

  return (
    <div className='p-4'>
      {jobSeekersCVs.length > 0 && (
        <>
          <div className='text-center mb-5'>
            <h1 className='text-secondary fw-bold'>
              Featured Candidates<span className='text-primary'>.</span>
            </h1>
            <p>Discover talents in the easiest way.</p>
          </div>
          <div className='row justify-content-center'>
            {jobSeekersCVs.map((jobSeekerCV, index) => (
              <CandidatesListItem key={index} jobSeekerCV={jobSeekerCV} />
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
