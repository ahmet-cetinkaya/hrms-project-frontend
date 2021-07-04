import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import FormFileInput from "../../../../components/FormFileInput/FormFileInput";
import JobSeekerCVImageService from "../../../../services/jobSeekerCVImageService";
import { toast } from "react-toastify";

export default function JobSeekerCVUpdateImages({ jobSeekerCV }) {
  const [images, setImages] = useState([]),
    [isEditing, setIsEditing] = useState(false);

  const initialValues = { image: null },
    validationSchema = Yup.object().shape({
      image: Yup.mixed().required(),
    });

  const toggleEditing = () => setIsEditing(!isEditing);

  const jobSeekerCVImageService = useMemo(() => new JobSeekerCVImageService(), []),
    getAllByJobSeekerId = useCallback(
      async (jobSeekerId) => {
        const result = await jobSeekerCVImageService.getAllByJobSeekerCV_Id(jobSeekerId);
        if (result.data.success) setImages(result.data.data);
      },
      [jobSeekerCVImageService]
    ),
    addImage = async (values) => {
      const result = await jobSeekerCVImageService.addAndSave(
        values.image,
        jobSeekerCV.jobSeeker.id
      );
      if (result.data.success) {
        getAllByJobSeekerId(jobSeekerCV.jobSeeker.id);
        toast.success(result.data.message);
      }
    },
    deleteImage = async (id) => {
      const result = await jobSeekerCVImageService.delete(id);
      if (result.data.success) {
        setImages(images.filter((i) => i.id !== id));
        toast.success(result.data.message);
      }
    };

  useEffect(() => {
    getAllByJobSeekerId(jobSeekerCV.id);
  }, [getAllByJobSeekerId, jobSeekerCV.id]);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3>Images</h3>
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

      {images.length > 0 ? (
        images.map((image) => (
          <figure key={image.id} className='figure position-relative me-3 mb-3'>
            {isEditing && (
              <button
                onClick={() => deleteImage(image.id)}
                className='btn btn-danger text-white position-absolute'
                style={{ right: 0 }}
              >
                <i className='bi bi-trash-fill' />
              </button>
            )}
            <img
              src={image.url}
              className='figure-img img-fluid rounded img-thumbnail rounded shadow'
              alt={`${jobSeekerCV.jobSeeker.firstName} ${jobSeekerCV.jobSeeker.lastName}`}
              width='150'
              height='150'
            />
            <figcaption className='figure-caption'>
              {new Date(...image.createdAt).toLocaleString()}
            </figcaption>
          </figure>
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
          onSubmit={(values) => addImage(values)}
        >
          <Form>
            <FormFileInput
              name='image'
              label={false}
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
          </Form>
        </Formik>
      )}
    </div>
  );
}
