import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import FormSelect from "../../../../components/FormSelect/FormSelect";
import JobSeekerCVLanguageService from "../../../../services/jobSeekerCVLanguageService";
import LanguageService from "../../../../services/languageService";
import { toast } from "react-toastify";

export default function JobSeekerCVUpdateLanguages({ jobSeekerCV }) {
  const [jobSeekerCVLanguages, setJobSeekerCVLanguages] = useState([]),
    [languages, setLanguages] = useState([]),
    [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);

  const languageService = useMemo(() => new LanguageService(), []),
    getAllLanguages = useCallback(async () => {
      const result = await languageService.getAll();
      setLanguages(result.data.data);
    }, [languageService]);

  const jobSeekerCVLanguageService = useMemo(() => new JobSeekerCVLanguageService(), []),
    getAllByJobSeekerCVId = useCallback(
      async (jobSeekerCVId) => {
        const result = await jobSeekerCVLanguageService.getAllByJobSeekerCV_Id(jobSeekerCVId);
        if (result.data.success) setJobSeekerCVLanguages(result.data.data);
      },
      [jobSeekerCVLanguageService]
    ),
    addJobSeekerCVLanguage = async (values) => {
      const newJobSeekerCVLanguage = {
        jobSeekerCV,
        ...values,
      };

      const result = await jobSeekerCVLanguageService.add(newJobSeekerCVLanguage);

      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    },
    deleteJobSeekerCVLanguage = async (jobSeekerCVLanguageId) => {
      const result = await jobSeekerCVLanguageService.delete(jobSeekerCVLanguageId);
      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    };

  const initialValues = {
      language: undefined,
      level: undefined,
    },
    validationSchema = Yup.object().shape({
      language: Yup.object().required(),
      level: Yup.number().required(),
    });

  useEffect(() => {
    getAllByJobSeekerCVId(jobSeekerCV.id);
    getAllLanguages();
  }, [getAllByJobSeekerCVId, getAllLanguages, jobSeekerCV.id]);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Languages</h3>
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
        {jobSeekerCVLanguages.length > 0 ? (
          jobSeekerCVLanguages.map((jobSeekerCVLanguage) => (
            <div
              key={jobSeekerCVLanguage.id}
              className='badge bg-secondary w-100 d-flex justify-content-start align-items-center mb-2 py-3 position-relative shadow'
            >
              {jobSeekerCVLanguage.language.name}
              {isEditing && (
                <button
                  onClick={() => deleteJobSeekerCVLanguage(jobSeekerCVLanguage.id)}
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
        {isEditing && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => addJobSeekerCVLanguage(values)}
          >
            <Form>
              <div className='row mt-3'>
                <div className='col-sm'>
                  <FormSelect
                    name='language'
                    options={languages.map((l) => ({
                      value: l,
                      label: l.name,
                    }))}
                    label={false}
                  />
                </div>
                <div className='col-sm'>
                  <FormSelect
                    name='level'
                    options={[1, 2, 3, 4, 5].map((l) => ({
                      value: l,
                      label: l.toString(),
                    }))}
                    label={false}
                    search={false}
                  />
                </div>
                <div className='col-sm'>
                  <button type='submit' className='btn btn-primary'>
                    Add
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}
