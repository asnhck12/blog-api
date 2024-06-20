import './SignupPage.css';

function SignupPage () {
    
    return (
    <>
    <div className="mainSignupSection">
        <form method="post">
            <div className='signupForm'>                
                <label htmlFor="firstname">First Name</label>
                <input type="" name="" required/>
                
                <label htmlFor="surname">Surname</label>
                <input type="" name="" required/>
                
                <label htmlFor="username">Username</label>
                <input type="" name="" required/>
                
                <label htmlFor="password">Password</label>
                <input type="" name="" required/>

                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="" name="" required/>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
    </>
    )
}

export default SignupPage