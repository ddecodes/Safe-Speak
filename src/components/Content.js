import React from "react";
import '../scss/style.scss';
import '../scss/_variables.scss';
import './Animation.css';
import videoBg from '../assets/therapyVideo.mp4';
import { Link } from 'react-router-dom';

export default function Content() {
    return (
        <div className="d-flex flex-column align-items-center position-relative wrapper">
            <video src={videoBg} autoPlay loop muted playsInline className="video-container" />
            <div className="overlay">
                <h1 className="roboto-regular text-white underline-animation fade-in-container">Find a Community like you</h1>
            </div>
        </div>

    );
}