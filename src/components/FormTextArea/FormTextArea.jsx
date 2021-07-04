import { toHeaderCase, toSentenceCase } from "js-convert-case";

import React from "react";
import { useField } from "formik";

export default function FormTextArea({
  name,
  label = toHeaderCase(name),
  rows = 3,
  className,
  disabled,
}) {
  const [field, meta] = useField(name);

  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={`${name}-textarea`} className='form-label fw-bold'>
        {label}
      </label>
      <div className='input-group has-validation'>
        <textarea
          {...field}
          {...{ name, rows }}
          id={`${name}-textarea`}
          className={`form-control ${
            meta.touched && !!meta.error ? "is-invalid" : ""
          }`}
          aria-describedby={`${name}-textarea`}
          disabled={disabled}
        />
        {meta.touched && !!meta.error ? (
          <div id={`${name}-textarea`} className='invalid-feedback'>
            {toSentenceCase(meta.error)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
