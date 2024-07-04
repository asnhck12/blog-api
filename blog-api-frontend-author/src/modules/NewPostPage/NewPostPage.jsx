import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './NewPostPage.css';
import { fetchWithAuth } from "../../../utils/api";

function NewPostPage () {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [published, setPublished] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPostData = {
            title: title,
            post: post,
            published: published
        };

        try {
            const response = await fetchWithAuth('https://blog-api-backend-lilac.vercel.app/posts/new_post', {
                method: 'POST',
                body: JSON.stringify(newPostData)
             
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit post');
            }

            const result = await response.json();
            console.log('Post submitted successfully:', result);

            // Clear form fields
            setTitle('');
            setPost('');
            setPublished(false);

            navigate('/');
        } catch (error) {
            console.error('Error submitting post:', error);
            console.log('post:', newPostData);

        }
    };

    return (
    <>
    <div className="mainNewPostSection">
        <form method="post"  onSubmit={handleSubmit}>
            <div className='newPostForm'>                
                <label htmlFor="title">Title</label>
                <input className="titleInput" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <label htmlFor="post">Post</label>
                <textarea className="postInput" value={post} onChange={(e) => setPost(e.target.value)} required/>
                <div className="publishCheckbox">
                    <label htmlFor="published">Publish</label>
                    <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)}/>
                </div>
                <div className="submitPostButton">
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>
    </div>
    </>
    )
}

export default NewPostPage