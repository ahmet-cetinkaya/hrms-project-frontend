import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import FormInput from "../../../../components/FormInput/FormInput";
import JobSeekerCVEducationService from "../../../../services/jobSeekerCVEducationService";
import { toast } from "react-toastify";

export default function JobSeekerCVUpdateEducations({ jobSeekerCV }) {
  const [jobSeekerCVEducations, setJobSeekerCVEducations] = useState([]),
    [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);

  const jobSeekerCVEducationService = useMemo(() => new JobSeekerCVEducationService(), []),
    getAllByJobSeekerCVId = useCallback(
      async (jobSeekerCVId) => {
        const result = await jobSeekerCVEducationService.getAllByJobSeekerCV_Id(jobSeekerCVId);
        if (result.data.success) setJobSeekerCVEducations(result.data.data);
      },
      [jobSeekerCVEducationService]
    ),
    addJobSeekerCVEducation = async (values) => {
      const newJobSeekerCVEducation = {
        jobSeekerCV,
        ...values,
      };
      const result = await jobSeekerCVEducationService.add(newJobSeekerCVEducation);

      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    },
    deleteJobSeekerCVEducation = async (jobSeekerCVEducationId) => {
      const result = await jobSeekerCVEducationService.delete(jobSeekerCVEducationId);
      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    };

  const initialValues = {
      schoolName: "",
      departmentName: "",
      startDate: "",
      graduationDate: "",
    },
    validationSchema = Yup.object().shape({
      schoolName: Yup.string().required(),
      departmentName: Yup.string().required(),
      startDate: Yup.date().required(),
      quitDate: Yup.date().min(Yup.ref("startDate")),
    });

  useEffect(() => {
    getAllByJobSeekerCVId(jobSeekerCV.id);
  }, [getAllByJobSeekerCVId, jobSeekerCV.id]);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Educations</h3>
        {!isEditing ? (
          <button className='btn shadow-none' onClick={() => toggleEditing()}>
            <i className='bi bi-pencil-square' />
          </button>
        ) : (
          <button type='button' className='btn shadow-none' onClick={() => toggleEditing()}>
            <i className='bi bi-check-lg' />
          </button>
        )}
      </div>
      <div className='mb-3'>
        {jobSeekerCVEducations.length > 0 ? (
          jobSeekerCVEducations.map((e) => (
            <div key={e.id} className='position-relative rounded shadow mb-3'>
              {isEditing && (
                <button
                  onClick={() => deleteJobSeekerCVEducation(e.id)}
                  className='btn btn-danger text-white position-absolute'
                  style={{ right: 0 }}
                >
                  <i className='bi bi-trash-fill' />
                </button>
              )}
              <div className='row p-3'>
                <div className='mb-2'>
                  <span className='fw-bold me-2'>School Name:</span>
                  {e.schoolName}
                </div>
                <div className='mb-2'>
                  <span className='fw-bold me-2'>Department Name:</span>
                  {e.departmentName}
                </div>
                <div className='col-sm'>
                  <div className='mb-2'>
                    <span className='fw-bold me-2'>Start Date:</span>
                    {new Date(...e.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='mb-2'>
                    <span className='fw-bold me-2'>Graduate Date:</span>
                    {e.graduationDate
                      ? new Date(...e.graduationDate).toLocaleDateString()
                      : "continues"}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='d-flex justify-content-center align-items-center display-1 text-light'>
            <i className='bi bi-text-paragraph' />
          </div>
        )}
        {isEditing && (
          <button
            type='button'
            className='btn btn-primary w-100'
            data-bs-toggle='modal'
            data-bs-target='#add-educations-modal'
          >
            <i className='bi bi-plus-lg me-2' />
            Add Educations
          </button>
        )}
      </div>

      <div
        className='modal fade'
        id='add-educations-modal'
        tabIndex={-1}
        aria-labelledby='add-educations-modal'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable'>
          <div className='modal-content'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => addJobSeekerCVEducation(values)}
            >
              <Form>
                <div className='modal-header'>
                  <h5 className='modal-title' id='add-educations-modal'>
                    Add Educations
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  />
                </div>
                <div className='modal-body'>
                  <FormInput name='schoolName' type='text' />
                  <FormInput name='departmentName' type='text' />
                  <FormInput name='startDate' type='date' />
                  <FormInput name='graduationDate' type='date' />
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    Add
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
