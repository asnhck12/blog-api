import { useState } from "react";
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';


function LoginPage () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit post');
            }

            const result = await response.json();
            console.log('Post submitted successfully:', result);

            // Clear form fields
            setUsername('');
            setPassword('');

            navigate('/');
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };
    return (
    <>
    <div className="mainLoginSection">
        <form method="post" onSubmit={handleSubmit}>
            <div className='loginForm'>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
    </>
    )
}

export default LoginPage