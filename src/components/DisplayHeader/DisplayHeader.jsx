import React from "react";

export default function DisplayHeader({ firstText, secondText, size = "1" }) {
  return (
    <h1 className={`display-${size} fw-bold text-primary mb-4`}>
      <span className='text-secondary'>{firstText}</span> {secondText}
      <span className='text-secondary'>.</span>
    </h1>
  );
}
