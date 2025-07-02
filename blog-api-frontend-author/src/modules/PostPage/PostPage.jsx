import { useState, useEffect } from "react";
import './PostPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/api";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const API_URL = import.meta.env.VITE_API_URL;

function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [specificPost, setSpecificPost] = useState(null);
    const [comments, setComments] = useState([]);
    const { loggedInStatus } = useOutletContext();

    const [title, setTitle] = useState('');
    const [post, setPost] = useState('');
    const [published, setPublished] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_URL}/posts/${id}`);
                const data = await response.json();
                setSpecificPost(data);
                setTitle(data.title);
                setPost(data.post);
                setPublished(data.published);
            } catch (error) {
                console.log("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [id]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/${id}/comments`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.log("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [id]);

    const handleDelete = async (postId, commentId) => {
        try {
            const response = await fetchWithAuth(`${API_URL}/posts/${postId}/comments/${commentId}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete comment');
            }

            setComments(prev => prev.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const updatedPost = {
            title,
            post,
            published
        };

        console.log("saved text; ", post);

        try {
            const response = await fetchWithAuth(`${API_URL}/posts/${id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update post');
            }

            const result = await response.json();
            console.log('Post updated successfully:', result);
            setSpecificPost(result);
            navigate('/');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (!specificPost) return <div>Loading...</div>;

    return (
        <div className="mainPostSection">
            <form onSubmit={handleSave}>
                <div className="postForm">
                    <div className="postTitleContainer">
                        <label htmlFor="title">Title</label>
                        <input className="titleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div className="postContainer">
                        <label htmlFor="post">Post</label>
                        <ReactQuill value={post} onChange={setPost} theme="snow" modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['link'],
                                ['clean']
                            ]
                        }}/>
                    </div>
                    <div className="publishCheckbox">
                        <label htmlFor="published">Publish</label>
                        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)}/>
                    </div>
                    <div className="submitSaveButton">
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>

            <div className="commentSection">
                <div className="comments">
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            <p><b>{comment.name}</b> says:</p>
                            <p>{comment.comment}</p>
                            {loggedInStatus && (
                                <a href="#" onClick={() => handleDelete(specificPost._id, comment._id)}><b>Delete</b></a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PostPage;
