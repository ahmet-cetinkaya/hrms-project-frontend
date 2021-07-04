import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import FormInput from "../../../../components/FormInput/FormInput";
import JobSeekerCVSkillService from "../../../../services/jobSeekerCVSkillService";
import { toast } from "react-toastify";

export default function JobSeekerCVUpdateSkills({ jobSeekerCV }) {
  const [jobSeekerCVSkills, setJobSeekerCVSkills] = useState([]),
    [isEditing, setIsEditing] = useState(false);

  const initialValues = { name: "" },
    validationSchema = Yup.object().shape({
      name: Yup.string().required(),
    });

  const toggleEditing = () => setIsEditing(!isEditing);

  const jobSeekerCVSkillService = useMemo(() => new JobSeekerCVSkillService(), []),
    getAllByJobSeekerId = useCallback(
      async (jobSeekerId) => {
        const result = await jobSeekerCVSkillService.getAllByJobSeekerCV_Id(jobSeekerId);
        if (result.data.success) setJobSeekerCVSkills(result.data.data);
      },
      [jobSeekerCVSkillService]
    ),
    add = async (values) => {
      const newJobSeekerCVSkill = {
          jobSeekerCV,
          ...values,
        },
        result = await jobSeekerCVSkillService.add(newJobSeekerCVSkill);
      if (result.data.success) {
        getAllByJobSeekerId(jobSeekerCV.jobSeeker.id);
        toast.success(result.data.message);
      }
    },
    delete_ = async (id) => {
      const result = await jobSeekerCVSkillService.delete(id);
      if (result.data.success) {
        setJobSeekerCVSkills(jobSeekerCVSkills.filter((i) => i.id !== id));
        toast.success(result.data.message);
      }
    };

  useEffect(() => {
    getAllByJobSeekerId(jobSeekerCV.id);
  }, [getAllByJobSeekerId, jobSeekerCV.id]);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Skills</h3>
        {!isEditing ? (
          <button className='btn shadow-none' onClick={() => toggleEditing()}>
            <i className='bi bi-pencil-square' />
          </button>
        ) : (
          <button className='btn shadow-none' onClick={() => toggleEditing()}>
            <i className='bi bi-check-lg' />
          </button>
        )}
      </div>
      <div className='mb-3'>
        {jobSeekerCVSkills.length > 0 ? (
          jobSeekerCVSkills.map((jobSeekerCVSkill) => (
            <div
              key={jobSeekerCVSkill.id}
              className='badge bg-secondary w-100 d-flex justify-content-start align-items-center mb-2 py-3 position-relative shadow'
            >
              {jobSeekerCVSkill.name}
              {isEditing && (
                <button
                  onClick={() => delete_(jobSeekerCVSkill.id)}
                  className='btn bg-transparent shadow-none text-white position-absolute'
                  style={{ right: 0 }}
                >
                  <i className='bi bi-trash-fill' />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className='d-flex justify-content-center align-items-center display-1 text-light'>
            <i className='bi bi-text-paragraph' />
          </div>
        )}
      </div>
      {isEditing && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => add(values)}
        >
          <Form>
            <FormInput
              name='name'
              label={false}
              render={
                <button
                  type='submit'
                  className='input-group-text btn btn-primary'
                  htmlFor={`name-input`}
                >
                  Add
                </button>
              }
            />
          </Form>
        </Formik>
      )}
    </div>
  );
}
