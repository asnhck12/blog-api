import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../auth/auth';
import { fetchWithAuth } from '../../../utils/api';
// import { useOutletContext } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Header ({setLoggedIn}) {

    const navigate = useNavigate();
    // const { loggedInStatus } = useOutletContext();

    const handleLogout = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetchWithAuth('https://blog-api-backend-lilac.vercel.app/log_out', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                localStorage.removeItem("token");
                navigate('/');
                setLoggedIn(false);
                
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
            <h1>Blog<br />Lite</h1>
        </div>
        <div className="navBar">
            <div className="homeButton">
                <Link to='/'>Home</Link>
            </div>
            {isLoggedIn ? (
                <>
                    <div className="logoutButton">
                        <a href="#" onClick={handleLogout}>Logout</a>
                    </div>
                </>
            ) : (
                <>
                    <div className="loginButton">
                        <Link to='login'>Login</Link>
                    </div>
                    <div className="signupButton">
                        <Link to='signup'>Signup</Link>
                    </div>
                </>
            )}
        </div>
    </div>
</>

    )
}

export default Header