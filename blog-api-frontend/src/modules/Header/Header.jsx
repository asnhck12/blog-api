import './Header.css';
import { Link } from 'react-router-dom';

function Header () {

    return (
        <>
        <div className="header">
            <div className="logo">
                <h1><Link to='/'>Blog<br />
                                Lite</Link> </h1>                   
            </div>
            <div className="navBar">
                <div className="homeButton">
                    <Link to='/'>Home</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header