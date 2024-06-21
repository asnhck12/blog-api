import {useState, useEffect} from "react";
import './PostPage.css';
import { useParams } from 'react-router-dom';

function PostPage () {
    const { id } = useParams();
    const [specificPost, setSpecificPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response =  await fetch(`http://localhost:3000/${id}`);
                const responseData = await response.json();
                console.log('response' + responseData);
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
        <div className="mainPostContent">
                    <h3>{specificPost.title}</h3>
                    <p>{specificPost.timeStamp}</p>
                    <p>{specificPost.post}</p>
        </div>
    </div>
    </>
    )
}

export default PostPage