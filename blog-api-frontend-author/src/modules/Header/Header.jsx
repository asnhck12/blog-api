import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../auth/auth';
import { fetchWithAuth } from '../../../utils/api';
import homeIcon from '../../assets/homeIcon.svg'
import signoutIcon from '../../assets/signoutIcon.svg'
const API_URL = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
function Header ({setLoggedIn}) {

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
    
        try {
            const response = await fetchWithAuth(`${API_URL}/log_out`, {
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
                <h1><Link to='/'>Gabb</Link> </h1> 
                <p>Creator</p>                  
            </div>
        <div className="navBarContainer">
            <div className="navBar">
                <div className="homeButton">
                    <Link to='/'><img src={homeIcon} /></Link>
                </div>
                {isLoggedIn ? (
                    <>
                        <div className="logoutButton">
                            <a href="#" onClick={handleLogout}><img src={signoutIcon} /></a>
                        </div>
                    </>
                ) : (
                    <>
                        
                    </>
                )}
            </div>
        </div>
    </div>
</>

    )
}

export default Header