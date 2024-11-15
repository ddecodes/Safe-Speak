import React from 'react';
import { Link } from 'react-router-dom';
import decor from '../assets/decor-home.png';
import './Animation.css';
import Lottie from 'lottie-react';
import effect from '../assets/sparkle-effect.json';

export default function Promo() {
    return (
        <div className="row mx-0 mt-5" >
            <div className="col d-flex flex-column align-items-center justify-content-center">
                <div className="text-container position-relative">
                    <Lottie animationData={effect} loop={true} className="lottie-background" />
                    <h1 className="display-1 custom-font shadow-text text-center position-relative">
                        Connect<br /> With People<br /> Who Relate.
                    </h1>
                </div>
                <Link className="btn btn-danger btn-lg mt-3" to="/signup">Join us Today</Link>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-center p-0 mt-3 mt-md-0">
                <img src={decor} alt="decor" className="sign-container img-fluid" />
            </div>
        </div>
    )
}
