import React from "react";

export default function SingleProject() {

    const comments = ["Comment One", "Comment Two", "Comment Three"]; // Renamed for clarity

    return (
        <div className="container m-5">
            {/* Post Section */}
            <div className="card mb-4">
                {/* Post Details */}
                <div className="card-header">
                    <small className="text-muted">Author: John Doe | Posted on: October 5, 2023</small>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Post Title</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores saepe adipisci totam cum eum tempore veritatis odio, nulla est vero autem iusto ducimus, labore illo neque! Voluptatum non voluptates optio enim aliquid obcaecati aut similique. Voluptates consequuntur eius pariatur perspiciatis non dolores nihil quos, quod delectus ea laboriosam voluptatibus quasi. Necessitatibus illo, ipsam omnis placeat aperiam laboriosam autem rem, deleniti soluta tempore, accusantium tenetur?.</p>
                </div>
            </div>

            {/* Comments Section */}
            <h3>Comments</h3>
            {comments.map((comment, index) => (
                <div key={index} className="card mb-2">
                    <div className="card-header">
                        Commenter Name | <small className="text-muted">Posted 1 hour ago</small>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{comment}</p>
                    </div>
                </div>
            ))}

            {/* Comment Form */}
            <div className="card">
                <div className="card-header">Leave a Comment</div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="commentText" className="form-label">Comment</label>
                            <textarea className="form-control" id="commentText" rows="3" placeholder="Write your comment here..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
