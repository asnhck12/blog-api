import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

function SignupPage () {
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postSignUpData = {
            firstname: firstname,
            surname: surname,
            username: username,
            email: email,
            password: password,
            confirm_password: confirmPassword
        };

        try {
            const response = await fetch('https://blog-api-backend-lilac.vercel.app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postSignUpData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit post');
            }

            const result = await response.json();
            console.log('Post submitted successfully:', result);

            // Clear form fields
            setFirstname('');
            setSurname('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            navigate('/login');
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };
        
    
    return (
    <>
    <div className="mainSignupSection">
        <form method="post"  onSubmit={handleSubmit}>
            <div className='signupForm'>                
                <label htmlFor="firstname">First Name</label>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>                
                <label htmlFor="surname">Surname</label>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required/>                
                <label htmlFor="username">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>                
                <label htmlFor="email">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required/>                
                <label htmlFor="password">Password</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
    </>
    )
}

export default SignupPage