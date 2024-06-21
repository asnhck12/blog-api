import './NewPostPage.css';

function NewPostPage () {
    
    return (
    <>
    <div className="mainNewPostSection">
        <form method="post">
            <div className='newPostForm'>                
                <label htmlFor="title">Title</label>
                <input type="text" name="title" required/>
                
                <label htmlFor="post">Post</label>
                <input type="text" name="post" required/>
                
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

export default NewPostPage