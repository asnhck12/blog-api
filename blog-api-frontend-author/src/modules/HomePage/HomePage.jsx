import { useState, useEffect } from "react";
import './HomePage.css';
import { Link, Navigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/api";
import placeholder from '../../assets/image_placeholder.png';
import addicon from '../../assets/addicon.svg';
import deleteicon from '../../assets/deleteicon.svg';
const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
    const [posts, setPosts] = useState([]);
    const { loggedInStatus } = useOutletContext();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetchWithAuth(`${API_URL}/posts`);
                const responseData = await response.json();
                console.log("status for logged in: ", loggedInStatus);
                setPosts(responseData);
            } catch (error) {
                console.log("Error fetching posts", error);
            }
        };

        fetchPosts();
    }, [loggedInStatus]);

    const handleDelete = async (postId) => {
        try {
            const response = await fetchWithAuth(`${API_URL}/posts/${postId}/delete`, {
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
    
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }

    };

    if (!loggedInStatus) return <Navigate to="/login" />
    
    return (
        <div className="mainSection">
            <div className="newPostSection">
                <Link to={'/new_post'}>
                <div className="newPostButton">
                    <img src={addicon} />
                </div>
                </Link>
            </div>
            <div className="mainContent">
                <div className="blogLists">
                    {loggedInStatus && (
                        <>
                            {Array.isArray(posts) && posts.length > 0 ? (
                                posts.map((post) => (
                                    <div key={post._id} className="postSectionContainer">
                                        <div className="postSection">
                                            <div className="postImg">
                                                <img src={placeholder}/>
                                            </div>
                                            <div className="postDetails">
                                                <div className="postDetailsTitle">
                                                    <h3><Link to={`/${post._id}`}>{post.title}</Link></h3>
                                                </div>
                                                <div className="postDetailsAndDelete">
                                                    <div className="postDetails">
                                                        <div className="postPublishedStatus">
                                                        {post.published ? (
                                                            <p>Published</p>
                                                        ) : (
                                                            <p>Not Published</p>
                                                        )}
                                                        </div>
                                                        <div className="postDetailsDate">
                                                            <p>{post.date_formatted}</p>
                                                        </div>
                                                    </div>
                                                    <div className="postDeleteButton">
                                                        <img src={deleteicon} onClick={() => handleDelete(post._id)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No posts available</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;