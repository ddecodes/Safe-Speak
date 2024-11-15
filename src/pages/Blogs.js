import React, { useState, useEffect } from "react";
import Nav from '../components/Nav';
import { Link, useNavigate } from 'react-router-dom';
import '../scss/_variables.scss';
import '../scss/style.scss';
import './blog.css';
import { initializeApp } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import PostModal from '../components/PostModal';
import { CircularProgress } from '@mui/material';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Blog() {
    const [user] = useAuthState(auth);
    const [blogs, setBlogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://therapytalk.onrender.com/blog');
                if (response.ok) {
                    let data = await response.json();
                    // Sort blogs by date
                    data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setBlogs(data); // Update the state with fetched blogs
                } else {
                    throw new Error('Failed to fetch blogs');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false when data fetching is completed
            }
        };

        fetchBlogs();
    }, []);

    const handlePost = async (postData) => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div>

            <Nav />

            <div className="post-bg rounded m-5 min-vh-100" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="mx-5 mt-3 row" style={{ width: '10rem' }}>
                    <button className="btn btn-danger" onClick={handlePost}>Create a Post</button>
                </div>
                {showModal && <PostModal closeModal={closeModal} />}
                {error && <div className="alert alert-danger m-5">{error}</div>}
                {loading && (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                        <CircularProgress />
                    </div>
                )}
                {!loading && !error && blogs.map((blog, index) => (
                    <div className="card mb-4 m-5" key={index}>
                        {/* Post Details */}
                        <div className="card-header">
                            <small className="text-muted">Author: {blog.username} | Posted on: {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{blog.title}</h2>
                            <div className="row mx-sm-2 mx-md-3 mb-2 mt-3">
                                {/* Tags */}
                                {blog.tags.map((tag, idx) => (
                                    <div key={idx} className="col col-auto tag bg-danger text-white px-2 py-1 m-1 font-weight-bold rounded d-inline-block">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <p className="card-text">{blog.content}</p>
                        </div>
                        <div className="p-4">
                            <Link to='/post'>Comments: </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
