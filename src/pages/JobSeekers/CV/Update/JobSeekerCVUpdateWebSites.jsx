import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import FormInput from "../../../../components/FormInput/FormInput";
import FormSelect from "../../../../components/FormSelect/FormSelect";
import JobSeekerCVWebsiteService from "../../../../services/jobSeekerCVWebSiteService";
import WebSiteService from "../../../../services/webSiteService";
import { toast } from "react-toastify";

export default function JobSeekerCVUpdateWebSites({ jobSeekerCV }) {
  const [jobSeekerCVWebsites, setJobSeekerCVWebsites] = useState([]),
    [webSites, setWebSites] = useState([]),
    [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);

  const webSiteService = useMemo(() => new WebSiteService(), []),
    getAllWebsites = useCallback(async () => {
      const result = await webSiteService.getAll();
      setWebSites(result.data.data);
    }, [webSiteService]);

  const jobSeekerCVWebsiteService = useMemo(() => new JobSeekerCVWebsiteService(), []),
    getAllByJobSeekerCVId = useCallback(
      async (jobSeekerCVId) => {
        const result = await jobSeekerCVWebsiteService.getAllByJobSeekerCV_Id(jobSeekerCVId);
        if (result.data.success) setJobSeekerCVWebsites(result.data.data);
      },
      [jobSeekerCVWebsiteService]
    ),
    addJobSeekerCVWebsite = async (values) => {
      const newJobSeekerCVWebsite = {
          jobSeekerCV,
          ...values,
        },
        result = await jobSeekerCVWebsiteService.add(newJobSeekerCVWebsite);
      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    },
    deleteJobSeekerCVWebsite = async (jobSeekerCVWebsiteId) => {
      const result = await jobSeekerCVWebsiteService.delete(jobSeekerCVWebsiteId);
      if (result.data.success) {
        toast.success(result.data.message);
        getAllByJobSeekerCVId(jobSeekerCV.id);
      }
    };

  const initialValues = {
      webSite: undefined,
      address: "",
    },
    validationSchema = Yup.object().shape({
      webSite: Yup.object().required(),
      address: Yup.string().required(),
    });

  useEffect(() => {
    getAllByJobSeekerCVId(jobSeekerCV.id);
    getAllWebsites();
  }, [getAllByJobSeekerCVId, getAllWebsites, jobSeekerCV.id]);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Websites</h3>
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
        {jobSeekerCVWebsites.length > 0 ? (
          jobSeekerCVWebsites.map((jobSeekerCVWebsite) => (
            <div
              key={jobSeekerCVWebsite.id}
              className='badge bg-secondary w-100 d-flex justify-content-start align-items-center mb-2 py-3 position-relative shadow'
            >
              <a
                href={jobSeekerCVWebsite.address}
                target='_blank'
                rel='noreferrer'
                className='link-light'
              >
                <i className={`bi bi-${jobSeekerCVWebsite.webSite.name} me-2`} />
                {jobSeekerCVWebsite.address}
              </a>

              {isEditing && (
                <button
                  onClick={() => deleteJobSeekerCVWebsite(jobSeekerCVWebsite.id)}
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
            onSubmit={(values) => addJobSeekerCVWebsite(values)}
          >
            <Form>
              <div className='row mt-4'>
                <div className='col-sm'>
                  <FormSelect
                    name='webSite'
                    options={webSites.map((l) => ({
                      value: l,
                      label: l.name,
                    }))}
                    label={false}
                  />
                </div>
                <div className='col-sm'>
                  <FormInput name='address' label={false} placeholder={"address"} />
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
