import { toHeaderCase, toSentenceCase } from "js-convert-case";

import React from "react";
import { useField } from "formik";

export default function FormInput({
  type,
  name,
  label = toHeaderCase(name),
  className,
}) {
  const [field, meta] = useField(name);

  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={`${name}Input`} className='form-label fw-bold'>
        {label}
      </label>
      <div className='input-group has-validation'>
        <input
          {...field}
          {...{ name }}
          type={type}
          id={`${name}Input`}
          className={`form-control ${
            meta.touched && !!meta.error ? "is-invalid" : ""
          }`}
          aria-describedby={`${name}Input`}
        />
        {meta.touched && !!meta.error ? (
          <div id={`${name}Input`} className='invalid-feedback'>
            {toSentenceCase(meta.error)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
