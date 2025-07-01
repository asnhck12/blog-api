import {useState, useEffect} from "react";
import './HomePage.css';
import { Link } from 'react-router-dom';
import placeholder from '../../assets/image_placeholder.png';

function HomePage () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://blog-api-backend-lilac.vercel.app/allposts');
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
        <div className="blogLists">
            {posts.map((post) => (
                <div key={post._id} className="postSectionContainer">
                    <div className="postSection">
                        <div className="postImg">
                            <img src={placeholder}/>
                        </div>
                        <div className="postDetails">
                            <div className="postDetailsTitle">
                                <h3><Link to={`/${post._id}`}>{post.title}</Link></h3>
                            </div>
                            <div className="postDetailsSubDesc">
                                <div className="postDetailsDate">
                                    <p>{post.date_formatted}</p>
                                </div>
                                <div className="postDetailsAuthor">
                                    <p>by {post.username.username} </p>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
            ))}
        </div>
    </div>

    </>
    )
}

export default HomePage