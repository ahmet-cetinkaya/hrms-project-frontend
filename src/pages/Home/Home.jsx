import CandidatesList from "../../components/CandidatesList/CandidatesList";
import CreateAccountBanner from "./CreateAccountBanner";
import JobAdvertsList from "../../components/JobAdvertsList/JobAdvertsList";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
import React from "react";
import Steps from "./Steps";

export default function Home() {
  return (
    <div className='container-fluid bg-white'>
      <div className='container'>
        <Overlay />
        <Steps />
        <JobAdvertsList />
        <CandidatesList />
        <CreateAccountBanner />
      </div>
    </div>
  );
}
