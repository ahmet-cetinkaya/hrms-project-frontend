import React from 'react';

export default function Steps() {
  return (
    <div className='row px-5 my-5'>
      <div className='col'>
        <h1 className='fw-bold display-5'>
          <span className='text-secondary'>Follow</span> <br /> Easy 4 Steps
        </h1>
        <p className='text-muted mt-4'>
          Adipisicing velit cupidatat labore nulla minim reprehenderit consequat incididunt pariatur. Adipisicing occaecat aliqua eu commodo sunt excepteur Lorem nostrud nostrud
          labore amet Lorem exercitation. Duis fugiat pariatur velit labore.
        </p>
      </div>
      <div className='col text-center'>
        <div className='row'>
          <div className='col-6'>
            <i className='bi bi-person fs-1 text-primary' />
            <div className='fw-bold'>Create Account</div>
            <div className='text-muted px-5'>First you have to create an account here.</div>
          </div>
          <div className='col-6 mt-4'>
            <i className='bi bi-file-earmark-person fs-1 text-danger' />
            <div className='fw-bold'>CV</div>
            <div className='text-muted px-5'>For a job you have to upload your best CV.</div>
          </div>
          <div className='col-6'>
            <i className='bi bi-search fs-1 text-success' />
            <div className='fw-bold'>Search Job</div>
            <div className='text-muted px-5'>Find your best job using search.</div>
          </div>
          <div className='col-lg-6 mt-4'>
            <i className='bi bi-check2-circle fs-1 text-secondary' />
            <div className='fw-bold'>Apply Them</div>
            <div className='text-muted px-5'>Finally you apply your job and enjoy your work.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
