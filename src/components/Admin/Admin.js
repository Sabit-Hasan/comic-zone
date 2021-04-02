import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Admin.css';
import goBackIcon from '../../images/left-arrow.png';
import { faTasks, faPlus, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../images/comic-book (1).png';

const Admin = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div>
            <div class="sidenav">

                <h3 style={{color:'white', fontSize:'14px', textAlign:'center'}}>User: {loggedInUser.name || loggedInUser.email}</h3>
                <Link className="remove-underline" to="/manageProduct"><FontAwesomeIcon style={{fontSize:'18px'}} icon={faTasks} /><span style={{fontSize:'20px'}}> Manage Product</span></Link>
                <Link className="remove-underline" to="/addProduct"><FontAwesomeIcon style={{fontSize:'18px'}} icon={faPlus} /><span style={{fontSize:'20px'}}> Add Product</span></Link>
                <Link className="remove-underline" to="/editProduct"><FontAwesomeIcon style={{fontSize:'18px'}} icon={faPen} /><span style={{fontSize:'20px'}}> Edit Product</span></Link>
                <Link className="remove-underline" to="/home">
                    <div className="go-back-div">
                        <img style={{width:'24px'}} src={goBackIcon} alt=""/> <span style={{fontSize:'20px'}}>Go Back</span>
                    </div>
                </Link>
                <div style={{marginTop:'80px'}}>
                    <h3><span style={{color:'white'}}>COMIC</span><span style={{color:'#FFD064'}}>-</span><span style={{color: 'red'}}>ZONE</span></h3>
                    <Link to="/home"><img src={logo} style={{width:'230px', marginLeft:'-20px'}} alt=""/></Link>
                </div>
            </div>
        </div>
    );
};

export default Admin;