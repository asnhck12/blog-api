import './Header.css';
import { Link } from 'react-router-dom';
import homeIcon from '../../assets/homeIcon.svg'
import authorIcon from '../../assets/authorIcon.svg'
const AUTHOR_URL = import.meta.env.VITE_AUTHOR_URL;

function Header () {

    console.log("author url: ", AUTHOR_URL)

    return (
        <>
        <div className="header">
            <div className="logo">
                <h1><Link to='/'>Gabb</Link> </h1>                   
            </div>
            <div className="navBarContainer">
                <div className="navBar">
                    <div className="homeButton">
                        <Link to='/'><img src={homeIcon} /></Link>
                    </div>
                    <div className="authorLogin">
                        <Link to={`${AUTHOR_URL}/`}><img src={authorIcon} /></Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header