import React, { useCallback, useEffect, useMemo, useState } from "react";

import DisplayHeader from "../../../../components/DisplayHeader/DisplayHeader";
import EmployerService from "../../../../services/employerService";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

export default function EmployerUpdateVerify() {
  const [employerUpdates, setEmployerUpdates] = useState(null),
    [employerDetail, setEmployerDetail] = useState(null);

  const employerService = useMemo(() => new EmployerService(), []),
    getAllEmployerUpdateByIsApprovedAndIsDeleted = useCallback(async () => {
      const result = await employerService.getAllUpdateByIsApprovedAndIsDeleted();
      setEmployerUpdates(result.data.data);
    }, [employerService]),
    verifyEmployerUpdate = async (employerUpdateId) => {
      const result = await employerService.verifyUpdate(employerUpdateId);

      if (result.data.success) {
        setEmployerUpdates([
          ...employerUpdates.filter((e) => e.id !== employerUpdateId),
          {
            ...employerUpdates.find((e) => e.id === employerUpdateId),
            active: true,
            deleted: true,
          },
        ]);
        toast.success(result.data.message);
      }
    },
    denyEmployerUpdate = async (employerUpdateId) => {
      const result = await employerService.denyUpdate(employerUpdateId);

      if (result.data.success) {
        setEmployerUpdates([
          ...employerUpdates.filter((e) => e.id !== employerUpdateId),
          {
            ...employerUpdates.find((e) => e.id === employerUpdateId),
            active: true,
            deleted: true,
          },
        ]);
        toast.success(result.data.message);
      }
    };

  const showEmployerDetail = (employerUpdate) => setEmployerDetail(employerUpdate);

  useEffect(() => {
    getAllEmployerUpdateByIsApprovedAndIsDeleted();
  }, [getAllEmployerUpdateByIsApprovedAndIsDeleted]);

  return (
    <div className='container'>
      <DisplayHeader firstText='Verify' secondText='Employer Update' size='5' />
      <div className='p-4 rounded shadow h-100 overflow-auto'>
        {employerUpdates === null ? (
          <LoadingSpinner />
        ) : employerUpdates && employerUpdates.length > 0 ? (
          <>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Company Name</th>
                  <th scope='col'>Website</th>
                  <th scope='col'>Corporate Email</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>updatedAt</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {employerUpdates.map((employerUpdate) => (
                  <tr className={employerUpdate.active ? "table-success" : ""}>
                    <th scope='row'>{employerUpdate.id}</th>
                    <td>{employerUpdate.companyName}</td>
                    <td>{employerUpdate.website}</td>
                    <td>
                      <a href={`mailto:${employerUpdate.corporateEmail}`} className='link-dark'>
                        {employerUpdate.corporateEmail}
                      </a>
                    </td>
                    <td>
                      <a href={`tel:${employerUpdate.phone}`} className='link-dark'>
                        {employerUpdate.phone}
                      </a>
                    </td>
                    <td>{new Date(...employerUpdate.updatedAt).toLocaleString()}</td>
                    <td>
                      <button
                        type='button'
                        className='btn btn-primary'
                        data-bs-toggle='modal'
                        data-bs-target='#employerUpdate-detail'
                        onClick={() => showEmployerDetail(employerUpdate)}
                      >
                        <i className='bi bi-zoom-in' />
                      </button>
                      {!employerUpdate.active && (
                        <>
                          <button
                            onClick={() => verifyEmployerUpdate(employerUpdate.id)}
                            className='btn btn-success text-white ms-2'
                          >
                            Verify
                          </button>
                          <button
                            type='button'
                            className='btn btn-danger text-white ms-2'
                            onClick={() => denyEmployerUpdate(employerUpdate.id)}
                          >
                            Deny
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className='modal fade'
              id='employerUpdate-detail'
              tabIndex={-1}
              aria-labelledby='employerUpdate-detail'
              aria-hidden='true'
            >
              <div className='modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='employerUpdate-detail'>
                      Employer Update Detail
                    </h5>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'
                    />
                  </div>
                  {employerDetail && (
                    <div className='modal-body'>
                      <table className='table table-striped'>
                        <thead>
                          <tr>
                            <th scope='col'></th>
                            <th scope='col'>Current Information</th>
                            <th scope='col'>Updated Information</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope='row'>Company Name</th>
                            <td>{employerDetail.employer.companyName}</td>
                            <td>{employerDetail.companyName}</td>
                          </tr>
                          <tr>
                            <th scope='row'>Web Site</th>
                            <td>{employerDetail.employer.website}</td>
                            <td>{employerDetail.website}</td>
                          </tr>
                          <tr>
                            <th scope='row'>Corporate Email</th>
                            <td>
                              <a
                                href={`mailto:${employerDetail.employer.corporateEmail}`}
                                className='link-dark'
                              >
                                {employerDetail.employer.corporateEmail}
                              </a>
                            </td>
                            <td>
                              <a
                                href={`tel:${employerDetail.corporateEmail}`}
                                className='link-dark'
                              >
                                {employerDetail.corporateEmail}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>Phone</th>
                            <td>
                              <a
                                href={`tel:${employerDetail.employer.phone}`}
                                className='link-dark'
                              >
                                {employerDetail.employer.phone}
                              </a>
                            </td>
                            <td>
                              <a href={`tel:${employerDetail.phone}`} className='link-dark'>
                                {employerDetail.phone}
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                      Close
                    </button>
                    <button
                      type='button'
                      className='btn btn-success text-white'
                      onClick={() => verifyEmployerUpdate(employerDetail.id)}
                    >
                      Verify
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger text-white'
                      onClick={() => denyEmployerUpdate(employerDetail.id)}
                    >
                      Deny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <i className='bi bi-ui-checks text-success' style={{ fontSize: "10rem" }} />
            <p className='text-center display-6'>There is no expected verify.</p>
          </div>
        )}
      </div>
    </div>
  );
}
