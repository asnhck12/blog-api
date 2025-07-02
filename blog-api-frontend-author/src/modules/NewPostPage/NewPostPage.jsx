import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './NewPostPage.css';
import { fetchWithAuth } from "../../../utils/api";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const API_URL = import.meta.env.VITE_API_URL;

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
            const response = await fetchWithAuth(`${API_URL}/posts/new_post`, {
                method: 'POST',
                body: JSON.stringify(newPostData)
             
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit post');
            }

            const result = await response.json();
            console.log('Post submitted successfully:', result);
            console.log("saved text new; ", newPostData);
            console.log("API URL: ", {API_URL});

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
        <div className='newPostForm'>
            <form method="post"  onSubmit={handleSubmit}>
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
                <div className="submitPostButton">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
    </>
    )
}

export default NewPostPage