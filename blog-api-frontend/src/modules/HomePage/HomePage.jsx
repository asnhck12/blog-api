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
        <div className="mainImage">
        </div>
        <div className="mainContent">
            {posts.map((post) => (
                <div key={post._id} className="postSection">
                    <Link to={`/${post._id}`}>
                    <h3>{post.title}</h3>
                    <p>{post._id}</p>
                    <p>{post.timeStamp}</p>
                    </Link>
                    </div>
            ))}
        </div>
    </div>

    </>
    )
}

export default HomePage