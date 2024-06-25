import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './NewPostPage.css';

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
            const response = await fetch('http://localhost:3000/posts/new_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPostData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit post');
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
        }
    };
    
    return (
    <>
    <div className="mainSignupSection">
        <form method="post"  onSubmit={handleSubmit}>
            <div className='signupForm'>                
                <label htmlFor="title">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <label htmlFor="post">Post</label>
                <textarea value={post} onChange={(e) => setPost(e.target.value)} required/>
                <label htmlFor="published">Publish</label>
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)}/>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
    </>
    )
}

export default NewPostPage