import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../auth/auth';

function Header () {

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetch('http://localhost:3000/log_out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                localStorage.removeItem("token");
                navigate('/');
                console.log(token);
            } else {
                console.error('Failed to logout:', response.status);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const isLoggedIn = isAuthenticated();

    return (
        <>
        <div className="header">
            <div className="logo">
                <h1>Blog<br />
                Lite</h1>
            </div>
            <div className="navBar">
                {isLoggedIn ? (
                    <>
                    <div className="homeButton">
                    <Link to='/'>Home</Link>
                </div>
                <div className="logoutButton">
                <button onClick={handleLogout}>Logout</button>
                </div>
                </>
                ):(
                    <>
                <div className="homeButton">
                    <Link to='/'>Home</Link>
                </div>
                <div className="loginButton">
                    <Link to='login'>Login</Link>
                </div>
                <div className="signupButton">
                <Link to='Signup'>Signup</Link>
                </div>
                </>
            )}
            </div>
        </div>
        </>
    )
}

export default Header