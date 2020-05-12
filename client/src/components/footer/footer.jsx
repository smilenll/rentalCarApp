import React from 'react';

const Footer = () => (
  <div className="row mt-5 mb-5">
    <div className="col-lg-2">
      <img
        src={`${process.env.PUBLIC_URL}/warp-plx-bg.png`}
        width="100px"
        alt="Logo-light"
        className="rounded mx-auto d-block"
      />
    </div>
    <div className="col-lg-8">
      <h6>
        Learning project from
        <strong> Atscale</strong>
      </h6>
      <br />
      <p>
        A small rental car company wants to manage its renting out procedure.
        The want web application that can help them monitor what cars are rented out,
        how much customer to pay and guide them through the checkout process.
        The application will be used by their own employees. It will require no login.
      </p>
    </div>
    <div className="col-lg-2">
      <h6>
        Created by:
      </h6>
      <br />
      <p>
        Smilen Lyubenov
      </p>
    </div>
  </div>
);

export default Footer;
