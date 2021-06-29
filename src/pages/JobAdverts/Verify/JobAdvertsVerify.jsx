import "./JobAdcertsVerify.scss";

import React, { useEffect, useState } from "react";

import DisplayHeader from "../../../components/DisplayHeader/DisplayHeader";
import JobAdvertService from "../../../services/jobAdvertService";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

export default function JobAdvertsVerify() {
  const [jobAdverts, setJobAdverts] = useState(null),
    [jobAdvertDetail, setJobAdvertDetail] = useState(null);

  const getAll = async () => {
    const result = await new JobAdvertService().getAllByIsActive(false);
    setJobAdverts(result.data.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const showJobAdvertDetail = (jobAdvert) => setJobAdvertDetail(jobAdvert),
    verifyJobAdvert = async (id) => {
      const result = await new JobAdvertService().verifyById(id);

      if (result.data.success) {
        setJobAdverts([
          ...jobAdverts.filter((j) => j.id !== id),
          {
            ...jobAdverts.find((jobAdvert) => jobAdvert.id === id),
            active: true,
          },
        ]);
        toast.success(result.data.message);
      }
    };

  return (
    <div className='container min-vh-75'>
      <DisplayHeader firstText='Verify' secondText='Job Adverts' size='5' />
      <div className='p-4 rounded shadow h-100 overflow-auto'>
        {jobAdverts === null && <LoadingSpinner />}
        {jobAdverts && jobAdverts.length > 0 ? (
          <>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Company Name</th>
                  <th scope='col'>Job Position</th>
                  <th scope='col'>Working Type</th>
                  <th scope='col'>Working Time</th>
                  <th scope='col'>Open Positions</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Salary</th>
                  <th scope='col'>City</th>
                  <th scope='col'>Application Deadline</th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {jobAdverts.map((jobAdvert) => (
                  <tr
                    key={jobAdvert.id}
                    className={jobAdvert.active ? "table-success" : ""}
                  >
                    <th scope='row'>{jobAdvert.id}</th>
                    <td>{jobAdvert.employer.companyName}</td>
                    <td>{jobAdvert.jobPosition.title}</td>
                    <td>{jobAdvert.workingType.name}</td>
                    <td>{jobAdvert.workingTime.name}</td>
                    <td>{jobAdvert.numberOfOpenPositions}</td>
                    <td>
                      <p className='desc'>{jobAdvert.description}</p>
                    </td>
                    <td>{`${jobAdvert.minSalary}-${jobAdvert.maxSalary}`}</td>
                    <td>{jobAdvert.city.name}</td>
                    <td>
                      {new Date(
                        ...jobAdvert.applicationDeadline
                      ).toLocaleString()}
                    </td>
                    <td>
                      {/* Button trigger modal */}
                      <button
                        type='button'
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#jobAdvert-detail'
                        onClick={() => showJobAdvertDetail(jobAdvert)}
                      >
                        <i className='bi bi-zoom-in' />
                      </button>
                    </td>
                    <td>
                      {!jobAdvert.active && (
                        <button
                          onClick={() => verifyJobAdvert(jobAdvert.id)}
                          className='btn btn-success text-white'
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className='modal fade'
              id='jobAdvert-detail'
              tabIndex={-1}
              aria-labelledby='jobAdvert-detail'
              aria-hidden='true'
            >
              <div className='modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='jobAdvert-detail'>
                      Job Advert Detail
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    />
                  </div>
                  {jobAdvertDetail && (
                    <div className='modal-body'>
                      <div className='mb-3 p-3 rounded border border-1 border-secondary'>
                        <h6>Employer</h6>
                        <div className='row'>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Company Name:
                            </span>
                            {jobAdvertDetail.employer.companyName}
                          </div>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Corporate Mail:
                            </span>
                            <a
                              href={`mailto:${jobAdvertDetail.employer.corporateEmail}`}
                              className='link-dark'
                            >
                              {jobAdvertDetail.employer.corporateEmail}
                            </a>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Phone:
                            </span>
                            <a
                              href={`tel:${jobAdvertDetail.employer.phone}`}
                              className='link-dark'
                            >
                              {jobAdvertDetail.employer.phone}
                            </a>
                          </div>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Website :
                            </span>
                            <a
                              href={`https://${jobAdvertDetail.employer.website}`}
                              className='link-dark'
                              target='_blank'
                              rel='noreferrer'
                            >
                              {jobAdvertDetail.employer.website}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className='mb-3 p-3 rounded border border-1 border-secondary'>
                        <h6>Job Position</h6>
                        <div className='row'>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Title:
                            </span>
                            {jobAdvertDetail.jobPosition.title}
                          </div>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Active:
                            </span>
                            {jobAdvertDetail.jobPosition.active.toString()}
                          </div>
                        </div>
                      </div>

                      <div className='mb-3 px-3'>
                        <div className='row'>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Working Type:
                            </span>
                            {jobAdvertDetail.workingType.name}
                          </div>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Working Time:
                            </span>
                            {jobAdvertDetail.workingTime.name}
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Number Of Open Positions:
                            </span>
                            {jobAdvertDetail.numberOfOpenPositions}
                          </div>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              City:
                            </span>
                            {jobAdvertDetail.city.name}
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Min Salary:
                            </span>
                            {jobAdvertDetail.minSalary}
                          </div>
                          <div className='col-md'>
                            <span className='badge bg-secondary fw-bold me-2 mt-2'>
                              Max Salary:
                            </span>
                            {jobAdvertDetail.maxSalary}
                          </div>
                        </div>
                        <div className='badge bg-secondary fw-bold me-2 my-2'>
                          Description:
                        </div>
                        <textarea disabled className='d-block w-100 rounded'>
                          {jobAdvertDetail.description}
                        </textarea>
                      </div>
                    </div>
                  )}
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                    >
                      Close
                    </button>
                    <button
                      type='button'
                      className='btn btn-success text-white'
                      onClick={() => verifyJobAdvert(jobAdvertDetail.id)}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <i
              className='bi bi-ui-checks text-success'
              style={{ fontSize: "10rem" }}
            />
            <p className='text-center display-6'>
              There is no expected verify.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
