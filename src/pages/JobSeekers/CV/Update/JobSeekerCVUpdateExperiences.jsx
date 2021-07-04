import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import FormInput from "../../../../components/FormInput/FormInput";
import FormSelect from "../../../../components/FormSelect/FormSelect";
import JobPositionService from "../../../../services/jobPositionService";
import JobSeekerCVExperienceService from "../../../../services/jobSeekerCVExperienceService";
import { toast } from "react-toastify";

export default function JobSeekerCVUpdateExperiences({ jobSeekerCV }) {
  const [jobSeekerCVExperiences, setJobSeekerCVExperiences] = useState([]),
    [experiences, setExperiences] = useState([]),
    [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);

  const jobPositionService = useMemo(() => new JobPositionService(), []),
    getAllExperiences = useCallback(async () => {
      const result = await jobPositionService.getAll();
      setExperiences(result.data.data);
    }, [jobPositionService]);

  const jobSeekerCVExperienceService = useMemo(() => new JobSeekerCVExperienceService(), []),
    getAllByJobSeekerCVId = useCallback(
      async (jobSeekerCVId) => {
        const result = await jobSeekerCVExperienceService.getAllByJobSeekerCV_Id(jobSeekerCVId);
        if (result.data.success) setJobSeekerCVExperiences(result.data.data);
      },
      [jobSeekerCVExperienceService]
    ),
    addJobSeekerCVExperience = async (values) => {
      const newJobSeekerCVExperience = {
        jobSeekerCV,
        ...values,
      };
      const result = await jobSeekerCVExperienceService.add(newJobSeekerCVExperience);

      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    },
    deleteJobSeekerCVExperience = async (jobSeekerCVExperienceId) => {
      const result = await jobSeekerCVExperienceService.delete(jobSeekerCVExperienceId);
      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    };

  const initialValues = {
      jobPosition: undefined,
      workplaceName: "",
      startDate: "",
      quitDate: "",
    },
    validationSchema = Yup.object().shape({
      jobPosition: Yup.object().required(),
      workplaceName: Yup.string().required(),
      startDate: Yup.date().required(),
      quitDate: Yup.date().min(Yup.ref("startDate")),
    });

  useEffect(() => {
    getAllByJobSeekerCVId(jobSeekerCV.id);
    getAllExperiences();
  }, [getAllByJobSeekerCVId, getAllExperiences, jobSeekerCV.id]);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Experiences</h3>
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
        {jobSeekerCVExperiences.length > 0 ? (
          jobSeekerCVExperiences.map((e) => (
            <div key={e.id} className='position-relative rounded shadow mb-3'>
              {isEditing && (
                <button
                  onClick={() => deleteJobSeekerCVExperience(e.id)}
                  className='btn btn-danger text-white position-absolute'
                  style={{ right: 0 }}
                >
                  <i className='bi bi-trash-fill' />
                </button>
              )}
              <div className='row p-3'>
                <div className='mb-2'>
                  <span className='fw-bold me-2'>Job Position:</span>
                  {e.jobPosition.title}
                </div>
                <div className='mb-2'>
                  <span className='fw-bold me-2'>Workplace:</span>
                  {e.workplaceName}
                </div>
                <div className='col-sm'>
                  <div className='mb-2'>
                    <span className='fw-bold me-2'>Start Date:</span>
                    {new Date(...e.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='mb-2'>
                    <span className='fw-bold me-2'>Quit Date:</span>
                    {e.quitDate ? new Date(...e.quitDate).toLocaleDateString() : "continues"}
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
            data-bs-target='#add-experiences-modal'
          >
            <i className='bi bi-plus-lg me-2' />
            Add Experiences
          </button>
        )}
      </div>

      <div
        className='modal fade'
        id='add-experiences-modal'
        tabIndex={-1}
        aria-labelledby='add-experiences-modal'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable'>
          <div className='modal-content'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => addJobSeekerCVExperience(values)}
            >
              <Form>
                <div className='modal-header'>
                  <h5 className='modal-title' id='add-experiences-modal'>
                    Add Experiences
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  />
                </div>
                <div className='modal-body'>
                  <FormSelect
                    name='jobPosition'
                    options={experiences.map((e) => ({
                      value: e,
                      label: e.title,
                    }))}
                  />
                  <FormInput name='workplaceName' type='text' />
                  <FormInput name='startDate' type='date' />
                  <FormInput name='quitDate' type='date' />
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
