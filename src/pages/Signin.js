import React, { useState } from "react";
import { FaGoogle } from 'react-icons/fa'; // Import Google icon
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import './mobile.css';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const auth = getAuth(app);

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                // Extract user information from the user object
                const { email, uid } = user;

                // Make a POST request to your backend server to add user profile data
                fetch('https://therapytalk.onrender.com/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, uid })
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('User profile created successfully');
                            navigate('/profile');
                        } else {
                            throw new Error('Failed to create user profile');
                        }
                    })
                    .catch(error => {
                        console.error('Error creating user profile:', error);
                    });
            })
            .catch((error) => {
                console.error('Error signing up:', error);
                const errorCode = error.code;
                const errorMessage = error.message;
                // Update the error state to display to the user
                setError(errorMessage);
            });
    }

    const handleSignIn = (e) => {
        e.preventDefault(); // Prevent form submission

        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                console.log(cred.user);
                navigate('/profile');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Update the error state to display to the user
                setError(errorMessage);
            });
    }

    return (
        <>
            <Nav />

            <div className="justify-content-center p-5" style={{ backgroundColor: '#f0ffff' }}>
                <div className=" mx-auto rounded bg-white mobile_format" style={{ backgroundColor: '#01cda9' }}>
                    <h1 className="mb-4">Sign In</h1>
                    <form onSubmit={handleSignIn}>
                        <div className="mb-3">
                            <label htmlFor="text-email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="text-email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text-password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="text-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="text-start"> {/* Add text-start class to move the button to the left */}
                            <button type="submit" className="btn btn-danger">Login</button>
                        </div>
                    </form>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    <div className="text-center mt-3">
                        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                        <button onClick={signInWithGoogle} className="btn btn-danger me-2"><FaGoogle /> Sign in with Google</button>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}