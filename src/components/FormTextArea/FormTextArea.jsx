import { toHeaderCase, toSentenceCase } from "js-convert-case";

import React from "react";
import { useField } from "formik";

export default function FormTextArea({
  name,
  label = toHeaderCase(name),
  rows = 3,
  className,
}) {
  const [field, meta] = useField(name);

  return (
    <div className={`mb-3 ${className}`}>
      <label htmlFor={`${name}Textarea`} className='form-label fw-bold'>
        {label}
      </label>
      <div className='input-group has-validation'>
        <textarea
          {...field}
          {...{ name, rows }}
          id={`${name}Textarea`}
          className={`form-control ${
            meta.touched && !!meta.error ? "is-invalid" : ""
          }`}
          aria-describedby={`${name}Textarea`}
        />
        {meta.touched && !!meta.error ? (
          <div id={`${name}Textarea`} className='invalid-feedback'>
            {toSentenceCase(meta.error)}
          </div>
        ) : null}
      </div>
    </div>
  );
}
