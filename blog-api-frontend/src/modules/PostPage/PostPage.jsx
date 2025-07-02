import {useState, useEffect} from "react";
import './PostPage.css';
import { useParams } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

function PostPage () {
    const { id } = useParams();
    const [specificPost, setSpecificPost] = useState(null);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    console.log("API URL", API_URL);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            name: name,
            comment: comment,
            post: id
        };

        try {
            const response = await fetch(`${API_URL}/posts/${id}/comments/new_comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit post');
            }

            const result = await response.json();
            console.log('Post submitted successfully:', result);

            // Clear form fields
            setName('');
            setComment('');

            fetchComments();
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    
    const fetchComments = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/${id}/comments`);
            const responseData = await response.json();
            console.log("Fetched comments:", responseData);
            setComments(responseData);
        } catch (error) {
            console.log("error fetching comments", error);
        }
    };
    useEffect(() => {
    fetchComments();
    }, [id]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response =  await fetch(`${API_URL}/posts/${id}`);
                const responseData = await response.json();
                console.log('Post HTML:', responseData.post);
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
        <div className="mainPostContentContainer">
            <div className="mainPostContent">
                <div className="mainPostContentTitle">
                    <h1>{specificPost.title}</h1>
                </div>
                <div className="mainPostContentAuthor">
                    <p>{specificPost.date_formatted}</p>
                    <p>by {specificPost.username.username}</p>
                </div>
                <div className="mainPostContentArticle">
                    <div dangerouslySetInnerHTML={{ __html: specificPost.post }} />
                </div>
            </div>
        </div>
        <div className="commentSectionContainer">
            <div className="commentSection">
            <div className="commentSectionTitle">
                <h2>Comments</h2>
            </div>
            <div className="commentSubmission">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="newCommentForm">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name || ""} onChange={(e) => setName(e.target.value)} required/>
                        <label htmlFor="comment">Leave a Comment</label>
                        <textarea type="text" name="comment" className="commentText" value={comment || ""} onChange={(e) => setComment(e.target.value)} required/>
                        <div className="submissionButton">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            <div className="comments">
            {comments.map((comment) => (
                <div key={comment._id} className="comment">
                    <p><b>{comment.name}</b> says:</p>
                    <p>{comment.comment}</p>
                    </div>
            ))}
        </div>
        </div>
    </div>
    </>
    )
}

export default PostPage