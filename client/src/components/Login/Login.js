import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { createUserWithEmailAndPasswordFunnction, handleGoogleSignIn, handleSignOut, resetPassword, signInWithEmailAndPasswordFunction } from './loginManager';
import google from '../../images/G.jpg'

function Login() {


    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,

    });

    // useContext
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const navigate = useNavigate();


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleResponse = (res, redicect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redicect) {
            // important lesson learn:
            // equivalent to history.goBack() in V5
            navigate(-2);
        }
    }


    const handleBlur = e => {
        // console.log(e.target.name, e.target.value);
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }; //copy
            newUserInfo[e.target.name] = e.target.value;

            setUser(newUserInfo);
        }
    }


    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPasswordFunnction(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPasswordFunction(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

        e.preventDefault();
    }


    return (
        <div style={{ textAlign: "center" }}>
            {
                user.isSignIn
                    ? <button onClick={signOut}>Sign out</button>
                    // : <button onClick={googleSignIn}>Sign in</button>
                    : <button onClick={googleSignIn}><img src={google} alt="" /></button>
            }
            <br />
            {/* <button>Sign in using Facebook</button>
            {
                user.isSignIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            } */}

            {/* <h1>Our own Authentication</h1> */}
            <br />
            <h1>OR</h1>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
            <label htmlFor="newUser">New User Sign up</label>

            <form onSubmit={handleSubmit}>
                {
                    newUser &&
                    <input type="text" name="name" onBlur={handleBlur} placeholder='Your name' />
                }
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email address' required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder='Your Password' />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
            </form>

            <button onClick={() => resetPassword(user.email)}>Forget or Reset Password</button>


            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
            }
        </div>
    );
}

export default Login;
