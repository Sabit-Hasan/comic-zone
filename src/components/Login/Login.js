import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import logo from '../../images/comic-book (1).png'
import './Login.css';
import googleIcon from '../../images/google.png';
import facebookIcon from '../../images/facebook.png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    const handleGoogleSignIn = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            
            const {displayName, email, photoURL} = result.user;
            const signedInUser = {name: displayName, email: email, photo: photoURL};
            console.log(signedInUser);
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

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })

    const handleBlur = (e) => {
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
            const userInfo = {...user};
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
        }
    }

    const handleSubmit = (e)=>{

        e.preventDefault();

        if(user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const userInfo = {...user};
                    userInfo.error = '';
                    userInfo.success = true;
                    setUser(userInfo);
                    console.log(userInfo);
                    setLoggedInUser(userInfo);
                    history.replace(from);
                    
                    // ...
                })
                .catch((error) => {
                    const userInfo = {...user};
                    userInfo.error = error.message;
                    userInfo.success = false;
                    setUser(userInfo);
                    history.replace(from);
                });
        }
    }
    return (
        <div className="login-background">
            <Navbar></Navbar>
            <h3 style={{textAlign: 'center', color:'white', margin:'15px'}}>Login Information</h3>
            <div className="custom-div">
                <form onSubmit={handleSubmit} className="form">
                    <div className="imgcontainer">
                        <img src={logo} alt="Avatar" class="avatar" style={{width: '150px'}}/>
                    </div>

                    <div class="container">
                        <label for="email"><b style={{color:'white'}}>Email</b></label>
                        <input onBlur={handleBlur} type="text" placeholder="Enter Email" name="email" required/>

                        <label for="password"><b style={{color:'white'}}>Password</b></label>
                        <input onBlur={handleBlur} type="password"  placeholder="Enter Password" name="password" required/>
                            
                        <button type="submit">Login</button>
                        <br/>
                        <label>
                        <input type="checkbox" name="remember"/><span style={{color:'white'}}> Remember me</span>
                        </label>
                        <p><a href="">Forget Password?</a></p>
                        <span style={{textAlign: 'center', color:'white'}}>Don't have an account?</span><Link to="/signup">Creat an account</Link>
                    </div>
                </form>
            </div>

            <div className="or-div">
                <h5>Or,</h5>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="row social-card cursor">
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

export default Login;