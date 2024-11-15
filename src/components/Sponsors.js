import React from 'react';

export default function Sponsors() {
  const sponsors = [
    {
      id: 1,
      name: 'Sponsor One',
      logo: 'logo',
    },
    {
      id: 2,
      name: 'Sponsor Two',
      logo: 'logo',
    },
  ];

  return (
    <div className="container m-5">
      <h2 className="mb-4">Our Sponsors</h2>
      {/* <p>Currently looking for sponsors</p> */}
      <div className="row">
        {sponsors.map(sponsor => (
          <div key={sponsor.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card">
              <img src={sponsor.logo} className="card-img-top" alt={sponsor.name} />
              <div className="card-body">
                <h5 className="card-title">{sponsor.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
