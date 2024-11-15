import React from 'react';
import Nav from './Nav';
import therapy_pic from "../assets/therapy_pic.jpg";

export default function AboutUs() {
  return (
    <>
      <Nav />
      <div className='container-fluid'>

        <div className='row' style={{ backgroundColor: '#f0ffff' }}>
          <div className='col-md-6'>
          </div>
          <div className='text-center col-md-5 p-5 text-md-end'>
            <h1 style={{ fontWeight: 'bold', fontSize: '3rem' }}>About Us</h1>
            <p className='fs-5'>
              We are undergraduate university students with an interest in programming and are huge advocates for mental health who are spread throughout the world in Australia, Canada and the United Kingdom. Our group formed from discussions about the challenges in the tech field and the need for mental well-being that fits within the United Nations' Sustainable Development Goals.
            </p>
          </div>
        </div>

        <div className='row bg-black justify-content-center p-5 '> {/* Added justify-content-center class */}
          <div className='col-11 m-4 text-center rounded' style={{ backgroundColor: '#01cda9' }}> {/* Added text-center class */}
            <div className='row p-3'>
              <div className='col-md-6 p-3'>
                <img src={therapy_pic} alt="pic" style={{ width: '60%', height: 'auto', borderRadius: "10px" }} />
              </div>
              <div className='col-md-6 p-3'>
                <h1 className='text-white text-start fw-bold'>
                  What We Do
                </h1>
                <p className='text-white text-start fs-5'>
                  This website is our response—a dedicated space where individuals can come together to share their experiences, find support, and access resources aimed at improving mental well-being. Our goal is to build a community that emphasizes the importance of mental health, offering a safe and nurturing environment for everyone to discuss, learn, and grow. Through this platform, we hope to make a positive difference in the lives of those who, like us, believe in the critical importance of maintaining mental health.

                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='row bg-black justify-content-center'>
          <div className='col-11 mb-4 text-center rounded'>
            <div className="container">
              <h2 className="text-center mb-4 text-white">Our Team</h2>
              <div className="row justify-content-center">
                <div className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Vicheka Ouen</h5>
                      <p className="card-text">Email: oeunvicheka95@gmail.com</p>
                      <p className="card-text">University: Toronto Metroplitan University</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Kometh Tauch</h5>
                      <p className="card-text">Email: tauchkometh.uk@gmail.com</p>
                      <p className="card-text">University: University of Bristol</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Sihamongkul Ros</h5>
                      <p className="card-text">Email: alice@example.com</p>
                      <p className="card-text">University: RMIT University</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Christopher Bingtang Soo</h5>
                      <p className="card-text">Email: alice@example.com</p>
                      <p className="card-text">University: University of Bristol</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
