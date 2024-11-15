import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Community() {
    const [recentPosts, setRecentPosts] = useState([]);
    const [tags] = useState([
        { value: 'addiction', label: 'Addiction' },
        { value: 'disorder', label: 'Disorder' },
        { value: 'depression', label: 'Depression' },
        { value: 'question', label: 'Question' },
        { value: 'therapy', label: 'Therapy' },
        { value: 'mood', label: 'Mood' }
    ]);

    useEffect(() => {
        // Fetch recent posts from the server when the component mounts
        fetchRecentPosts();
    }, []);

    const fetchRecentPosts = async () => {
        try {
            const response = await fetch('https://therapytalk.onrender.com/blog/recent');
            if (response.ok) {
                const data = await response.json();
                setRecentPosts(data); // Update state with the fetched recent posts
            } else {
                throw new Error('Failed to fetch recent posts');
            }
        } catch (error) {
            console.error('Error fetching recent posts:', error);
        }
    };

    return (
        <div className="container-fluid custom-bg text-white py-5" id="community">
            <div className="container-fluid text-center px-5">
                <div className="row justify-content-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-7 mx-auto mb-5">
                                <div className="input-group search-container">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-danger" type="button">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row bg-primary rounded-4">
                            <div className="col-md-6 col-lg-3 mx-auto mb-3 justify-content-center rounded">
                                <h2 className="m-4">Popular Groups</h2>
                                {tags.map((tag, idx) => (
                                    <div key={idx} className="tag bg-danger text-white px-3 py-2 m-1 font-weight-bold rounded-pill d-inline-block">
                                        {tag.label}
                                    </div>
                                ))}
                            </div>

                            <div className="col-md-6 col-lg-9 p-5 mb-3">
                                <div>
                                    <h2 className="">Recent Post</h2>
                                </div>
                                {recentPosts.map((post, index) => (
                                    <div className="card mb-4 m-5" key={index}>
                                        {/* Post Details */}
                                        <div className="card-header">
                                            <small className="text-muted">Author: {post.username} | Posted on: {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</small>
                                        </div>
                                        <div className="card-body">
                                            <h2 className="card-title">{post.title}</h2>
                                            <div className="row mx-sm-2 mx-md-3 mb-2 mt-3">
                                                {/* Tags */}
                                                {post.tags.map((tag, idx) => (
                                                    <div key={idx} className="col col-auto tag bg-danger text-white px-2 py-1 m-1 font-weight-bold rounded d-inline-block">
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="card-text">{post.content}</p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
