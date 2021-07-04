import "./JobSeekerCVUpdate.scss";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import DisplayHeader from "../../../../components/DisplayHeader/DisplayHeader";
import FormTextArea from "../../../../components/FormTextArea/FormTextArea";
import JobSeekerCVService from "../../../../services/jobSeekerCVService";
import JobSeekerCVUpdateEducations from "./JobSeekerCVUpdateEducations";
import JobSeekerCVUpdateExperiences from "./JobSeekerCVUpdateExperiences";
import JobSeekerCVUpdateImages from "./JobSeekerCVUpdateImages";
import JobSeekerCVUpdateLanguages from "./JobSeekerCVUpdateLanguages";
import JobSeekerCVUpdateSkills from "./JobSeekerCVUpdateSkills";
import JobSeekerCVUpdateWebSites from "./JobSeekerCVUpdateWebSites";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

export default function JobSeekerCVUpdate() {
  const [jobSeekerCV, setJobSeekerCV] = useState(null),
    [isEditingCV, setIsEditingCV] = useState(false);

  const toggleEditing = () => {
    setIsEditingCV(!isEditingCV);
  };

  const jobSeekerCVService = useMemo(() => new JobSeekerCVService(), []),
    getJobSeekerCV = useCallback(async () => {
      const jobSeeker = { id: 1 }, //TODO Login Redux
        result = await jobSeekerCVService.getByJobSeeker_Id(jobSeeker.id);
      setJobSeekerCV(result.data.data);
    }, [jobSeekerCVService]),
    update = async (values) => {
      const updatedJobSeekerCV = { ...jobSeekerCV, ...values },
        result = await jobSeekerCVService.update(updatedJobSeekerCV);
      if (result.data.success) toast.success(result.data.message);
    };

  const validationSchema = Yup.object().shape({
    coverLetter: Yup.string().required(),
  });

  useEffect(() => {
    getJobSeekerCV();
  }, [getJobSeekerCV]);

  return (
    <div className='container h-100'>
      <DisplayHeader firstText='Edit' secondText='CV Information' size='5' />

      {jobSeekerCV ? (
        <div>
          <div className='row mb-4'>
            <div className='col-md'>
              <h3>Personal Information</h3>
              <div className='mb-2'>
                <span className='fw-bold me-2'>First Name:</span>
                {jobSeekerCV.jobSeeker.firstName}
              </div>
              <div className='mb-2'>
                <span className='fw-bold me-2'>Last Name:</span>
                {jobSeekerCV.jobSeeker.lastName}
              </div>
              <div className='mb-2'>
                <span className='fw-bold me-2'>Birth Date:</span>
                {new Date(...jobSeekerCV.jobSeeker.birthDate).toLocaleDateString()}
              </div>
              <div className='mb-2'>
                <span className='fw-bold me-2'>Email:</span>
                {jobSeekerCV.jobSeeker.email}
              </div>
            </div>
            <div className='col-md'>
              <JobSeekerCVUpdateImages jobSeekerCV={jobSeekerCV} />
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-md'>
              <Formik
                initialValues={{ coverLetter: jobSeekerCV.coverLetter }}
                validationSchema={validationSchema}
                onSubmit={(values) => update(values)}
              >
                <Form>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h3>Additional Information</h3>
                    {!isEditingCV ? (
                      <button className='btn shadow-none' onClick={() => toggleEditing()}>
                        <i className='bi bi-pencil-square' />
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn shadow-none'
                        onClick={() => toggleEditing()}
                      >
                        <i className='bi bi-check-lg' />
                      </button>
                    )}
                  </div>
                  <FormTextArea name='coverLetter' disabled={!isEditingCV}></FormTextArea>
                </Form>
              </Formik>
            </div>
            <div className='col-md'>
              <JobSeekerCVUpdateWebSites jobSeekerCV={jobSeekerCV} />
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-md'>
              <JobSeekerCVUpdateExperiences jobSeekerCV={jobSeekerCV} />
            </div>
            <div className='col-md'>
              <JobSeekerCVUpdateEducations jobSeekerCV={jobSeekerCV} />
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-md'>
              <JobSeekerCVUpdateSkills jobSeekerCV={jobSeekerCV} />
            </div>
            <div className='col-md'>
              <JobSeekerCVUpdateLanguages jobSeekerCV={jobSeekerCV} />
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
