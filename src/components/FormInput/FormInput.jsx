import { toHeaderCase, toSentenceCase } from "js-convert-case";

import React from "react";
import { useField } from "formik";

export default function FormInput({
  type,
  name,
  label = toHeaderCase(name),
  placeholder = `Please enter ${toHeaderCase(name)}`,
  className,
  render,
}) {
  const [field, meta] = useField(name);

  return (
    <div className='mb-3'>
      {label && (
        <label htmlFor={`${name}-input`} className='form-label fw-bold'>
          {label}
        </label>
      )}
      <div className='input-group has-validation'>
        <input
          {...field}
          {...{ name, placeholder }}
          type={type}
          id={`${name}-input`}
          className={`form-control ${className} ${
            meta.touched && !!meta.error ? "is-invalid" : ""
          }`}
          aria-describedby={`${name}-input`}
        />
        {render}
        {meta.touched && !!meta.error ? (
          <div id={`${name}-input`} className='invalid-feedback'>
            {toSentenceCase(meta.error)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
