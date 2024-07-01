import {useState, useEffect} from "react";
import './PostPage.css';
import { useParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/api";

function PostPage () {
    const { id } = useParams();
    const [specificPost, setSpecificPost] = useState(null);
    // const [name, setName] = useState("");
    // const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const { loggedInStatus } = useOutletContext();

    const handleDelete = async (postId, commentId) => {
        try {
            const response = await fetchWithAuth(`http://localhost:3000/posts/${postId}/comments/${commentId}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
                throw new Error('Failed to delete post');
            }
    
            console.log('Post deleted successfully');
    
            // Update the comments state after deletion
            setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const commentData = {
    //         name: name,
    //         comment: comment,
    //         post: id
    //     };

    //     try {
    //         const response = await fetch(`http://localhost:3000/posts/${id}/comments/new_comment`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(commentData)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to submit post');
    //         }

    //         const result = await response.json();
    //         console.log('Post submitted successfully:', result);

    //         // Clear form fields
    //         setName('');
    //         setComment('');

    //         fetchComments();
    //     } catch (error) {
    //         console.error('Error submitting post:', error);
    //     }
    // };

    
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}/comments`);
            const responseData = await response.json();
            console.log("Fetched comments:", responseData); // Log fetched data
            setComments(responseData);
        } catch (error) {
            console.log("error fetching comments", error);
        }
    };
    useEffect(() => {
    fetchComments();
    }, [id]);

    const handlePublishedChange = async (e) => {
        const updatedPost = { ...specificPost, published: e.target.checked };
        try {
            const response = await fetchWithAuth(`http://localhost:3000/posts/${id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            setSpecificPost(updatedPost);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response =  await fetchWithAuth(`http://localhost:3000/posts/${id}`);
                const responseData = await response.json();
                console.log('response' + responseData);
                setSpecificPost(responseData);
            } catch (error) {
                console.log("error fetching post " + error);
            }
            };
            fetchPost();
        }, [id]);

        if (!specificPost) {
            return <div>Loading...</div>;
        }
    
    return (
    <>
    <div className="mainPostSection">
        <div className="mainPostContent">
                    <h3>{specificPost.title}</h3>
                    <p>{specificPost.timeStamp}</p>
                    <p>{specificPost.post}</p>
                    <label htmlFor="published">Publish</label>
                    <input type="checkbox" checked={specificPost.published} onChange={handlePublishedChange}/>
        </div>
        <div className="commentSection">
            <div className="commentSubmission">
            {/* <form method="post" onSubmit={handleSubmit}>
                <div className="newCommentForm">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name || ""} onChange={(e) => setName(e.target.value)} required/>
                    <label htmlFor="comment">Comment</label>
                    <input type="text" name="comment" value={comment || ""} onChange={(e) => setComment(e.target.value)} required/>
                    <button type="submit">Submit</button>
                </div>
            </form> */}
            </div>
            <div className="comments">
            {comments.map((comment) => (
                <div key={comment._id} className="comment">
                    <h3>{comment.name}</h3>
                    <p>{comment.comment}</p>
                    {loggedInStatus ? (
                            <button type = "button" onClick={() => handleDelete(specificPost._id, comment._id)}>Delete</button>
                        ) : null}
                    </div>
            ))}
        </div>
        </div>
    </div>
    </>
    )
}

export default PostPage