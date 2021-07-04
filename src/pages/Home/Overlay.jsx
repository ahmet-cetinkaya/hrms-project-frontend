import React from "react";
import overlayVector from "../../assets/images/overlay-vector.svg";

export default function Overlay() {
  return (
    <div className='row'>
      <div className='col-md d-flex justify-content-center align-items-center'>
        <section id='job-advert-search'>
          <h1 className='display-1 fw-bold text-primary'>
            <span className='text-secondary'>Find</span> Job
            <span className='text-secondary'>.</span>
          </h1>
          <h4>Your dream job is waiting for you.</h4>
          <form className='p-3 my-5 d-flex justify-align-items-center align-items-centerrounded-2 shadow rounded-2'>
            <div className='input-group'>
              <span className='input-group-text border-0 bg-transparent shadow-none'>
                <i className='bi bi-briefcase align-self-center text-muted' />
              </span>
              <input
                type='search'
                className='form-control border-0 shadow-none'
                placeholder='Search for job title'
                aria-label='job title'
              />
              <span className='input-group-text border-0 bg-transparent shadow-none'>
                <i className='bi bi-geo-alt align-self-center text-muted' />
              </span>
              <input
                type='search'
                className='form-control border-0 shadow-none'
                placeholder='Search for city'
                aria-label='city'
              />
              <button className='btn btn-primary p-3 rounded' type='submit'>
                <i className='bi bi-search align-self-center me-1' /> Find
              </button>
            </div>
          </form>
        </section>
      </div>
      <div className='col-md'>
        <img src={overlayVector} alt='hrms project' />
        <a href='https://www.freepik.com/vectors/business' className='d-none'>
          Business vector created by katemangostar - www.freepik.com
        </a>
      </div>
    </div>
  );
}
