import "./FormSelect.scss";

import React, { useState } from "react";
import { toHeaderCase, toSentenceCase } from "js-convert-case";

import { useField } from "formik";

export default function FormSelect({
  name,
  options,
  placeholder = `Select ${toHeaderCase(name)}`,
  label = toHeaderCase(name),
  className,
  search = true,
}) {
  const [filterText, setFilterText] = useState(""),
    [fieldLabel, setFieldLabel] = useState("");

  const [, meta, helper] = useField(name);

  const setField = (value, label) => {
    helper.setValue(value);
    setFieldLabel(label);
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={`${name}Select`} className='form-label fw-bold'>
          {label}
        </label>
      )}

      <div className='dropdown'>
        <button
          className='position-relative btn btn-white dropdown-toggle w-100 d-flex justify-content-between align-items-center'
          type='button'
          id={`${name}-select`}
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {!!meta.error ? <div className='select-input-invalid-feedback'></div> : null}
          {fieldLabel || placeholder}
        </button>

        <ul className='dropdown-menu w-100 p-2 rounded' aria-labelledby={`${name}-select`}>
          {search && (
            <div className='input-group mb-2'>
              <span className='input-group-text' id={`${name}-search-input-icon`}>
                <i className='bi bi-search' />
              </span>
              <input
                type='text'
                name='filterText'
                className='form-control'
                placeholder='Search'
                aria-describedby={`${name}-search-input-icon`}
                aria-label='Username'
                autoComplete='off'
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          )}

          {options
            .filter((o) => o.label.toLowerCase().includes(filterText.toLowerCase()))
            .map((option, index) => (
              <li
                key={index}
                onClick={() => setField(option.value, option.label)}
                className={`dropdown-item cursor-pointer ${fieldLabel === option ? "active" : ""}`}
              >
                {option.label}
              </li>
            ))}
        </ul>
        {!!meta.error ? <div className='text-danger ms-1'>{toSentenceCase(meta.error)}</div> : null}
      </div>
    </div>
  );
}
