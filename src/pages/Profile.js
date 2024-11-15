import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app'; // Import initializeApp
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PostModal from "../components/PostModal";

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

export default function Profile() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User has logged out.")
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            })
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Check if user is authenticated
                if (!user) return;

                // Fetch profile data based on user's UID
                const response = await fetch(`https://therapytalk.onrender.com/profile/${user.uid}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, [user]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const checkResponse = await fetch(`https://therapytalk.onrender.com/profile/${user.uid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (checkResponse.ok) {
                const existingProfile = await checkResponse.json();
                const method = existingProfile ? 'PUT' : 'POST'; // Determine the HTTP method based on whether the profile exists
                const url = existingProfile ? `https://therapytalk.onrender.com/profile/${user.uid}` : 'https://therapytalk.onrender.com/profile';

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, description, email: user.email, uid: user.uid })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('User updated/created:', data);
                } else {
                    throw new Error('Failed to update/create user');
                }
            } else {
                throw new Error('Failed to check profile existence');
            }

            // Clear
            setUsername('');
            setDescription('');
        } catch (error) {
            console.error('Error creating/updating user:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#B9F1E7' }}>
            <Nav />
            <div className="m-5 col text-center">
                <h1 style={{ fontSize: "60px", fontFamily: "Times New Roman", fontWeight: "bold", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>Let's know a bit more about you</h1>
                <div className="mt-5">
                    {profileData ? (
                        <div className="row gap-2 justify-content-center">
                            <div className="row justify-content-center gap-2">
                                <div className="bg-white p-1 rounded" style={{ width: "12rem" }}>
                                    <u><h4>Email: </h4></u>
                                    <p style={{ overflowWrap: "break-word" }}>{user.email}</p> {/* Apply overflowWrap CSS property */}
                                </div>
                                <div className="bg-white p-1 rounded" style={{ width: "12rem" }}>
                                    <u><h4>Username: </h4></u>
                                    <p style={{ overflowWrap: "break-word" }}>{profileData.username}</p> {/* Apply overflowWrap CSS property */}
                                </div>
                            </div>
                            <div className="bg-white p-1 rounded" style={{ width: "12rem", maxHeight: "200px", overflowY: "auto" }}>
                                <u><h4>About me: </h4></u>
                                <p style={{ overflowWrap: "break-word" }}>{profileData.description}</p> {/* Apply overflowWrap CSS property */}
                            </div>
                        </div>

                    ) : (
                        <p>Loading profile data...</p>
                    )}
                    <div >
                        <div className="mb-3 mt-5">
                            <u><b>
                                <h2>Edit here</h2>
                            </b></u>
                        </div>
                        <form className=" mx-auto pt-5 pb-1 rounded" style={{ backgroundColor: 'white', height: "520px", width: "600px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }} onSubmit={handleSubmit}>
                            <div style={{ paddingTop: "40px" }} >
                                <input type='text' id='username' placeholder="Username" style={{ fontSize: "20px", borderRadius: "5px", height: "70px", width: "450px", paddingLeft: "15px", marginBottom: "20px" }} onChange={(e) => setUsername(e.target.value)} value={username} required></input>
                            </div>

                            <div>
                                <input type='text' id='description' placeholder="About me (max: 1000 chars)" style={{ fontSize: "20px", borderRadius: "5px", height: "250px", width: "450px", paddingLeft: "15px", marginBottom: "10px", paddingBottom: "200px" }} onChange={(e) => setDescription(e.target.value)} value={description} required></input>
                            </div>

                            <button type="submit" className="btn btn-danger m-2" style={{ height: "50px", width: "80px", fontSize: "20px", marginBottom: "20px" }}>Save</button>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-center mx-3 my-3">
                    <button className="btn btn-danger col-sm-1" onClick={handleSignOut}>Logout</button>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}