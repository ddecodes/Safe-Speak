import React, { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Nav from '../components/Nav';
import Content from '../components/Content';
import Graph1 from "../components/graph1";
import Graph2 from "../components/graph2";
import Solution from '../components/Solution';
import Promo from '../components/Promo';
import Footer from '../components/Footer';
import '../scss/style.scss';
import '../scss/_variables.scss';
import './homestyle.css';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export default function Home() {

    return (
        <div className="custom-bg">
            <div>
                <Nav />
            </div>
            <div id='section1' className="section ">
                <Content />
            </div>
            <div id='section2' className="section p-5">
                <Graph1 />
            </div>
            <div id='section3' className="section p-5">
                <Graph2 />
            </div>
            <div id="section4" className="section custom-purple-bg ">
                <Solution />
            </div>
            <div id="section5" className="section ">
                <Promo />
            </div>
            <div id="section6" className="section ">
                <Footer />
            </div>
        </div>
    )
}
