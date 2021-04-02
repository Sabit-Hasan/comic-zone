import React, { useContext, useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/comic-book.png';
import profileLogo from '../../images/profile-user.png'

const Navbar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const signOut = (user) =>{
        setLoggedInUser(user);
    }
    const [logOut, setLogOut] = useState();
    return (
        <div>
            {/* Navbar Section */}
            <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <div className="container-fluid d-flex justify-content-between">
                <a className="navbar-brand title" href="#"><img src={logo} alt="" style={{position: 'relative', top:'-5px'}}/> COMIC-<span style={{color: 'red'}}>ZONE</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ml-auto menu nav-ul">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link active" aria-current="page" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/orders" className="nav-link">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">Admin</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/details" className="nav-link">Details</Link>
                        </li>
                        <li style={{ margin:'-6px 3px'}} className="nav-item">
                            {
                                loggedInUser.email ? 
                                <div className="row d-flex justify-content-between">
                                    <div className="col-7 mt-3">
                                            <div>
                                                <h6><img src={profileLogo} style={{width: '20px'}}/>{loggedInUser.name ||loggedInUser.email}</h6>
                                            </div>
                                    </div>
                                    <div className="col-5 mt-2">
                                            <div>
                                                <button onClick={signOut} style={{width:'100px', height:'40px'}}> Log Out</button>
                                            </div>
                                    </div>
                                </div>
                                 : <Link className="login-icon" to="/login"><button style={{width:'100px', height:'40px', backgroundColor:'green'}}><img src={profileLogo} style={{width: '20px',marginRight:'5px'}}/>
                                Login</button></Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>
    );
};

export default Navbar;