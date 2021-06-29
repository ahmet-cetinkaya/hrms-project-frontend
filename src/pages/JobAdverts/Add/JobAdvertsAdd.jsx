import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import CityService from "../../../services/cityService";
import DisplayHeader from "../../../components/DisplayHeader/DisplayHeader";
import FormInput from "../../../components/FormInput/FormInput";
import FormSelect from "../../../components/FormSelect/FormSelect";
import FormTextArea from "../../../components/FormTextArea/FormTextArea";
import JobAdvertService from "../../../services/jobAdvertService";
import JobPositionService from "../../../services/jobPositionService";
import WorkingTimeService from "../../../services/workingTimeService";
import WorkingTypeService from "../../../services/workingTypeService";
import { toast } from "react-toastify";

export default function JobAdvertsAdd() {
  const [cities, setCities] = useState([]),
    [jobPositions, setJobPositions] = useState([]),
    [workingTypes, setWorkingTypes] = useState([]),
    [workingTimes, setWorkingTimes] = useState([]);

  const initialValues = {
      applicationDeadline: "",
      city: "",
      description: "",
      jobPosition: "",
      minSalary: 0,
      maxSalary: 0,
      numberOfOpenPositions: 1,
    },
    schema = Yup.object().shape({
      applicationDeadline: Yup.date().min(new Date()).required(),
      city: Yup.object().required(),
      description: Yup.string().required(),
      jobPosition: Yup.object().required(),
      minSalary: Yup.number().moreThan(0).required(),
      maxSalary: Yup.number().moreThan(Yup.ref("minSalary")).required(),
      numberOfOpenPositions: Yup.number().moreThan(0).required(),
      workingType: Yup.object().required(),
      workingTime: Yup.object().required(),
    }),
    addJobAdvert = async (values) => {
      const result = await new JobAdvertService().add({
        ...values,
        employer: { id: 2 }, // TODO
      });
      if (result.data.success) toast.success(result.data.message);
    };

  const getAllJobPositions = async () => {
      const result = await new JobPositionService().getAll();
      setJobPositions(result.data.data);
    },
    getAllCity = async () => {
      const result = await new CityService().getAll();
      setCities(result.data.data);
    },
    getAllWorkingTypes = async () => {
      const result = await new WorkingTypeService().getAll();
      setWorkingTypes(result.data.data);
    },
    getAllWorkingTimes = async () => {
      const result = await new WorkingTimeService().getAll();
      setWorkingTimes(result.data.data);
    };

  useEffect(() => {
    getAllCity();
    getAllJobPositions();
    getAllWorkingTypes();
    getAllWorkingTimes();
  }, []);

  return (
    <div className='container'>
      <DisplayHeader firstText='Add' secondText='Job Advert' size='5' />
      <div className='mt-4'>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => addJobAdvert(values)}
        >
          <Form>
            <div className='row'>
              <div className='col-sm-6'>
                <FormSelect
                  name='jobPosition'
                  options={jobPositions.map((c) => ({
                    value: c,
                    label: c.title,
                  }))}
                />
              </div>
              <div className='col-sm'>
                <FormSelect
                  name='city'
                  options={cities.map((c) => ({ value: c, label: c.name }))}
                />
              </div>
              <div className='col-sm'>
                <FormInput type='number' name='numberOfOpenPositions' />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm'>
                <FormSelect
                  name='workingType'
                  options={workingTypes.map((w) => ({
                    value: w,
                    label: w.name,
                  }))}
                />
              </div>
              <div className='col-sm'>
                <FormSelect
                  name='workingTime'
                  options={workingTimes.map((w) => ({
                    value: w,
                    label: w.name,
                  }))}
                />
              </div>
              <div className='col-sm'>
                <FormInput type='number' name='minSalary' />
              </div>
              <div className='col-sm'>
                <FormInput type='number' name='maxSalary' />
              </div>
            </div>
            <FormTextArea name='description' />
            <FormInput type='datetime-local' name='applicationDeadline' />
            <div className='text-end'>
              <button type='submit' className='btn btn-lg btn-primary'>
                Add
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
