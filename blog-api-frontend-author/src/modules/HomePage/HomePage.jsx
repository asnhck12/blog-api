import { useState, useEffect } from "react";
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { fetchWithAuth } from "../../../utils/api";

function HomePage() {
    const [posts, setPosts] = useState([]);
    const { loggedInStatus } = useOutletContext();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetchWithAuth('https://blog-api-backend-lilac.vercel.app/posts');
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
            const response = await fetchWithAuth(`https://blog-api-backend-lilac.vercel.app/posts/${postId}/delete`, {
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
    
            // Update the posts state after deletion
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    

    return (
        <div className="mainSection">
            <div className="newPostSection">
                <div className="homePageTitle">
                    <h1>Posts</h1>
                </div>
                {!loggedInStatus ? (
                    <>
                    <Link to={'/login'}><p>Please Log in to view your posts</p></Link>
                    </>
                ) : (
                    <div className="newPostButton">
                        <Link to={'/new_post'}>
                            <button>Add a New Post</button>
                        </Link>
                    </div>
                )}
            </div>
            <div className="mainContent">
                {loggedInStatus && (
                    <>
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post._id} className="postSection">
                                    <div className="postTitle">
                                        <h3><Link to={`/${post._id}`}>{post.title}</Link></h3>
                                    </div>
                                    <div className="postPublishedStatus">
                                    {post.published ? (
                                        <p>Published</p>
                                    ) : (
                                        <p>Not Published</p>
                                    )}
                                    </div>
                                    <div className="postSubmit">
                                        <button type="button" onClick={() => handleDelete(post._id)}>Delete</button>
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
    );
}

export default HomePage;