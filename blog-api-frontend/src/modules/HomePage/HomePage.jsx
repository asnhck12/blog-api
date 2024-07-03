import {useState, useEffect} from "react";
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/allposts');
                const responseData = await response.json();
                setPosts(responseData);
            } catch (error) {
                console.log("Error fetching posts", error);
            }
        };

        fetchPosts();
    }, []);
    
    return (
    <>
    <div className="mainSection">
    <div className="homePageTitle">
        <h1>Posts</h1>
        </div>
        <div className="mainContent">
            {posts.map((post) => (
                <div key={post._id} className="postSection">
                    <h2><Link to={`/${post._id}`}>{post.title}</Link></h2>
                    {/* <p>{post.username.username} </p> */}
                    <p>{post.date_formatted}</p>
                </div>
            ))}
        </div>
    </div>

    </>
    )
}

export default HomePage