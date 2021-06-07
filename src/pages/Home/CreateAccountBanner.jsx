import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateAccountBanner() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='row bg-primary sbg-gradient rounded-2 shadow p-5 text-white w-75 mt-5'>
        <div className='col-8'>
          <h1 className='display-6 fw-bold'>Let's get connected and start finding your dream job</h1>
        </div>
        <div className='col d-flex justify-content-center align-items-center'>
          <Link to='/' className='btn bg-white text-primary btn-lg p-3 rounded shadow'>
            Create free account
          </Link>
        </div>
      </div>
    </div>
  );
}
