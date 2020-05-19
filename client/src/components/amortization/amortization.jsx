import React, { useState } from 'react';
import CreateAmortization from './create-amortization';
import ShowAmortization from './show-amortizations';


const Amortization = () => {
  const [showCreate, setShowCreate] = useState(false);

  return(
    showCreate
      ? (
        <>
        <div className="row">
      <div className="col-lg-6">
        <button
        type="button"
        className="return-car-btn mt-4"
        onClick={() => setShowCreate(false)}
        >
          Hide form
        </button>
      </div>
    </div>
    <div className="row">
        <div className="col-lg-6">
          <CreateAmortization />
        </div>
        <div className="col-lg-6">
          <ShowAmortization />
        </div>
      </div>
      </>
    )
    : (
      <>
      <div className="row">
      <div className="col-lg-6">
        <button
        type="button"
        className="create-amortization-btn mt-4"
        onClick={() => setShowCreate(true)}
        >
          Create new amortization filter  
        </button>
      </div>
    </div>
      <div className="row">
        <div className="col-lg-12">
          <ShowAmortization />
        </div>
      </div>
    </> 
    )
  
  )};

export default Amortization;
