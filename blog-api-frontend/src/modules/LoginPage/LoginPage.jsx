import './LoginPage.css';

function LoginPage () {
    
    return (
    <>
    <div className="mainLoginSection">
        <form method="post">
            <div className='loginForm'>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" required/>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
    </>
    )
}

export default LoginPage