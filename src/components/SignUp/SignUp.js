import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/comic-book (1).png';
import Navbar from '../Navbar/Navbar';
import facebookIcon from '../../images/facebook.png';
import googleIcon from '../../images/google.png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { UserContext } from '../../App';



const SignUp = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    })

    const handleChange = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasValue = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasValue;
        }

        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password, user.photoURL)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
                // ..
            });
        }
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {name: displayName, email: email, photo: photoURL};
            setLoggedInUser(signedInUser);
            history.replace(from);
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    return (
        <div className="login-background">
            <Navbar></Navbar>
            <h3 style={{textAlign: 'center', color: 'white', margin: '15px'}}>Sign Up Information</h3>

            <h5 style={{color:'red', textAlign:'center', margin: '20px',}}>{user.error}</h5>

            {
                user.success && <h5 style={{color:'green', textAlign:'center', margin: '20px',}}>{user.error}User Created Successfully</h5>
            }

            <div className="custom-div">
            <form className="form" onSubmit={handleSubmit}>
                <div class="imgcontainer">
                    <img src={logo} alt="Avatar" class="avatar" style={{width: '150px'}}/>
                </div>

                <div class="container">
                    <label for="name"><b style={{color:'white'}}>Username</b></label>
                    <input onBlur={handleChange} type="text" placeholder="Enter Username" name="name" required />

                    <label for="email"><b style={{color:'white'}}>Email</b></label>
                    <input onBlur={handleChange} type="email" className="login-input" placeholder="Enter Email" name="email"  required/>

                    <label for="password"><b style={{color:'white'}}>Password<small> (minimum 6 characters with 1 number)</small></b></label>
                    <input onBlur={handleChange} type="password" className="login-input" placeholder="Enter Password" name="password" required />

                    <button type="submit">Sign Up</button>

                    <span style={{color:'white'}}>Already have an account?</span><Link to="/login">Login</Link>
                </div>
            </form>
            </div>
            
            <div className="or-div">
                <h5>Or,</h5>
                <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="row social-card">
                    <div className="col-md-2">
                        <img className="custom-img" src={facebookIcon} alt=""/>
                    </div>
                    <div className="col-md-10 d-flex align-items-center">
                        <span style={{color:'white'}}>Continue with Facebook</span>
                    </div>
                </div>

                <div className="row social-card cursor" onClick={handleGoogleSignIn}>
                    <div className="col-md-2">
                        <img className="custom-img" src={googleIcon} alt=""/>
                    </div>
                    <div className="col-md-10 d-flex align-items-center">
                        <span style={{color:'white'}}>Continue with Google</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );
};

export default SignUp;