import React, { useState, useEffect } from "react";
import './PostModal.css';
import Select, { components, onChange } from 'react-select';
import makeAnimated from 'react-select/animated';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

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

export default function PostModal({ closeModal }) {
    const animatedComponents = makeAnimated();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [user] = useAuthState(auth);
    const [submissionStatus, setSubmissionStatus] = useState({
        loading: false,
        error: null,
        success: false
    });

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

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            if (!user) {
                throw new Error('User not authenticated');
            }

            setSubmissionStatus({ loading: true, error: null, success: false }); // Start loading

            const bid = user.uid;
            let username = ''; // Initialize username
            if (profileData && profileData.username) {
                username = profileData.username; // Update username if available
            }

            // Extracting tag values
            const tagValues = tags.map(tag => tag.value);

            const postData = {
                title,
                tags: tagValues, // Use the extracted tag values
                content,
                bid,
                username
            };

            const response = await fetch('https://safespeak.onrender.com/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                setSubmissionStatus({ loading: false, error: null, success: true }); // Set success
                console.log('Post successfully');
            } else {
                throw new Error('Failed to create post');
            }
        } catch (error) {
            setSubmissionStatus({ loading: false, error: error.message, success: false }); // Set error
            console.error('Error creating post', error);
        }
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="row mobile-format">
                    <h2 className="col">Create a Post</h2>
                    <div className="col mobile-format2">
                        <button className="btn btn-danger close-button rounded" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
                <form onSubmit={handlePost}>
                    <div className="form-group">
                        <label htmlFor="blog-title">Title</label>
                        <input type="text" className="form-control" id="blog-title" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <label>Tags</label>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={[
                                { value: 'addiction', label: 'Addiction' },
                                { value: 'disorder', label: 'Disorder' },
                                { value: 'depression', label: 'Depression' },
                                { value: 'question', label: 'Question' },
                                { value: 'therapy', label: 'Therapy' },
                                { value: 'mood', label: 'Mood' },
                            ]}
                            onChange={setTags}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="blog-content">Content</label>
                        <textarea className="form-control" id="blog-content" rows="3" placeholder="Write something here..." value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                    </div>
                    <button className="btn btn-primary mt-5">Submit</button>

                    {submissionStatus.loading && <p>Loading...</p>}
                    {submissionStatus.error && <p>Error: {submissionStatus.error}</p>}
                    {submissionStatus.success && <p>Post submitted successfully!</p>}
                </form>
            </div>
        </div>
    )
}