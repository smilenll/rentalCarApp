import React from 'react';
import CreateAmortization from './create-amortization';
import ShowAmortization from './show-amortizations';


const Amortization = () => (
    <div className="row">
      <div className="col-lg-6">
        <CreateAmortization />
      </div>
      <div className="col-lg-6">
        <ShowAmortization />
      </div>
    </div>
);
export default Amortization;
