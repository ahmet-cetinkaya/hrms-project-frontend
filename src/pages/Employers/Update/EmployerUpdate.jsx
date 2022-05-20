import "./EmployerUpdate.scss";

import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import DisplayHeader from "../../../components/DisplayHeader/DisplayHeader";
import EmployerService from "../../../services/employerService";
import FormFileInput from "../../../components/FormFileInput/FormFileInput";
import FormInput from "../../../components/FormInput/FormInput";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

export default function EmployerUpdate() {
  const [employer, setEmployer] = useState(null);

  const employerService = useMemo(() => new EmployerService(), []),
    getByUserId = useCallback(async () => {
      const user = { id: 2 }, //TODO Login Redux
        result = await employerService.getById(user.id);

      if (result.data.success) setEmployer(result.data.data);
    }, [employerService]),
    getLastUpdateByUserId = useCallback(async () => {
      const user = { id: 2 }, //TODO Login Redux
        result = await employerService.getLastUpdateByUserId(user.id);

      if (result.data.success) showPendingUpdateApproval(result.data.data);
    }, [employerService]),
    updateByUser = async (values) => {
      const updatedEmployer = {
          employerId: employer.id,
          ...values,
        },
        result = await employerService.updateByUser(updatedEmployer);

      if (result.data.success) toast.success(result.data.message);
    };

  const showPendingUpdateApproval = (employerUpdate) => {
    if (!employerUpdate.approved && !employerUpdate.deleted)
      toast.info("Awaiting approval for the update.");
  };

  const initialValues = {
      password: "",
    },
    validationSchema = Yup.object().shape({
      companyName: Yup.string().required(),
      website: Yup.string().required(),
      corporateEmail: Yup.string().required(),
      phone: Yup.string().required(),
      password: Yup.string().required(),
    });

  useEffect(() => {
    getByUserId();
    getLastUpdateByUserId();
  }, [getByUserId, getLastUpdateByUserId]);

  return (
    <div className='container'>
      <DisplayHeader firstText='Edit' secondText='Employer Information' size='5' />
      {employer ? (
        <Formik
          initialValues={{
            companyName: employer.companyName,
            website: employer.website,
            corporateEmail: employer.corporateEmail,
            phone: employer.phone,
            ...initialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => updateByUser(values)}
        >
          <Form>
            <div className='row'>
              <div className='col-sm'>
                <FormInput name='companyName' />
              </div>
              <div className='col-sm'>
                <div className='row'>
                  <div className='col'>
                    <FormFileInput
                      name='companyImage'
                      accept='image/png, image/jpeg'
                      render={
                        <button
                          type='submit'
                          className='input-group-text btn btn-primary'
                          htmlFor={`image-file-input`}
                        >
                          Upload
                        </button>
                      }
                    />
                  </div>
                  <div className='col-3 d-flex justify-content-center align-items-center'>
                    <figure className='figure position-relative me-3 mb-3'>
                      {employer.companyImageUrl ? (
                        <img
                          src={employer.companyImageUrl}
                          className='figure-img img-fluid rounded img-thumbnail rounded shadow'
                          alt={`${employer.companyName} logo`}
                          width='70'
                          height='70'
                        />
                      ) : (
                        <i className='bi bi-briefcase fs-1 me-3 text-muted' />
                      )}
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <FormInput name='website' />
            <FormInput name='corporateEmail' />
            <FormInput name='phone' />
            <FormInput type='password' name='password' />
            <button type='submit' className='btn btn-primary w-100 mt-3'>
              Save
            </button>
          </Form>
        </Formik>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
