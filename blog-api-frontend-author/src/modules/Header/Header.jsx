import './Header.css';
import { Link } from 'react-router-dom';

function Header () {

    return (
        <>
        <div className="header">
            <div className="logo">
                <h1>Blog<br />
                Lite</h1>
            </div>
            <div className="navBar">
                <div className="homeButton">
                    <Link to='/'>Home</Link>
                </div>
                <div className="loginButton">
                    <Link to='login'>Login</Link>
                </div>
                <div className="signupButton">
                <Link to='Signup'>Signup</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header