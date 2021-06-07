import React from 'react';

import Overlay from './Overlay';
import Steps from './Steps';
import JobAdvertsList from '../../components/JobAdvertsList/JobAdvertsList';
import CandidatesList from '../../components/CandidatesList/CandidatesList';
import CreateAccountBanner from './CreateAccountBanner';

export default function Home() {
  return (
    <div className='container-fluid bg-white'>
      <div className='container'>
        <Overlay />
        <Steps />
        <JobAdvertsList />
        <CandidatesList />
        <CreateAccountBanner />
      </div>
    </div>
  );
}
