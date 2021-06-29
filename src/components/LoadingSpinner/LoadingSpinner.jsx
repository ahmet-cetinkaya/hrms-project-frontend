import React from "react";

export default function LoadingSpinner({ className }) {
  return (
    <div className='d-flex justify-content-center align-items-center w-100 h-100'>
      <div className={` spinner-grow text-primary ${className}`} role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
}
