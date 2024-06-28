import {useState, useEffect} from "react";
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts');
                const responseData = await response.json();
                console.log("Fetched posts:", responseData);
                setPosts(responseData);
            } catch (error) {
                console.log("error fetching posts", error);
            }
        };

        fetchPosts();
    }, []);
    
    return (
    <>
    <div className="mainSection">
        <div className="newPostButton">
            <div className="homePageTitle">
                <h1>My Posts</h1>
            </div>
            <div className="newPostButton">
                <Link to={'/new_post'}>
                <button>Add a New Post</button>
                </Link>
            </div>
        </div>
        <div className="mainContent">
            {posts.map((post) => (
                <div key={post._id} className="postSection">
                    <h3><Link to={`/${post._id}`}>{post.title}</Link></h3>
                    <p>by {post.user}, {post.timeStamp}</p>  
                    </div>
            ))}
        </div>
    </div>

    </>
    )
}

export default HomePage