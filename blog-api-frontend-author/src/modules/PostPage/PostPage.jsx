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
            const response = await fetchWithAuth(`https://blog-api-backend-lilac.vercel.app/posts/${postId}/comments/${commentId}/delete`, {
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

    const fetchComments = async () => {
        try {
            const response = await fetch(`https://blog-api-backend-lilac.vercel.app/posts/${id}/comments`);
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
            const response = await fetchWithAuth(`https://blog-api-backend-lilac.vercel.app/posts/${id}/update`, {
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
                const response =  await fetch(`https://blog-api-backend-lilac.vercel.app/posts/${id}`);
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
                    <h1>{specificPost.title}</h1>
                    <label htmlFor="published">Publish</label>
                    <input type="checkbox" checked={specificPost.published} onChange={handlePublishedChange}/>
                    <p>{specificPost.post}</p>
        </div>
        <div className="commentSection">
            <div className="commentSubmission">
            </div>
            <div className="comments">
            {comments.map((comment) => (
                <div key={comment._id} className="comment">
                    <p><b>{comment.name}</b> says:</p>
                    <p>{comment.comment}</p>
                    {loggedInStatus ? (
                            <a href="#" onClick={() => handleDelete(specificPost._id, comment._id)}><b>Delete</b></a>
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