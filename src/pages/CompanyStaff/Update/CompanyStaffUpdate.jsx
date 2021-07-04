import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import CompanyStaffService from "../../../services/companyStaffService";
import DisplayHeader from "../../../components/DisplayHeader/DisplayHeader";
import FormInput from "../../../components/FormInput/FormInput";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

export default function CompanyStaffUpdate() {
  const [companyStaff, setCompanyStaff] = useState(null);

  const companyStaffService = useMemo(() => new CompanyStaffService(), []),
    getById = useCallback(async () => {
      const user = { id: 3 }, //TODO Login Redux
        result = await companyStaffService.getById(user.id);
      if (result.data.success) setCompanyStaff(result.data.data);
    }, [companyStaffService]),
    updateByUser = async (values) => {
      const updatedCompanyStaff = {
          id: companyStaff.id,
          ...values,
        },
        result = await companyStaffService.updateByUser(updatedCompanyStaff);

      if (result.data.success) {
        toast.success(result.data.message);
        setCompanyStaff(updatedCompanyStaff);
      }
    };

  useEffect(() => {
    getById();
  }, [getById]);

  const initialValues = {
      password: "",
    },
    validationSchema = Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      password: Yup.string().required(),
    });

  return (
    <div className='container'>
      <DisplayHeader firstText='Edit' secondText='Employer Information' size='5' />
      {companyStaff ? (
        <Formik
          initialValues={{
            firstName: companyStaff.firstName,
            lastName: companyStaff.lastName,
            ...initialValues,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => updateByUser(values)}
        >
          <Form>
            <FormInput name='firstName' />
            <FormInput name='lastName' />
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
