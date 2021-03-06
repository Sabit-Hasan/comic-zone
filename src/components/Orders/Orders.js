import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Navbar from '../Navbar/Navbar';

const Orders = () => {

    const [book, setBook] = useState({});

    const {_id} = useParams();

    useEffect(() =>{
        fetch(`https://pure-anchorage-11283.herokuapp.com/getComics/${_id}`)
        .then(res => res.json())
        .then(data => setBook(data))
    },[])
    return (
        <div>
            <Navbar></Navbar>
            <h2>Checkout</h2>
            <div className="container">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{book.name}</td>
                        <td>1</td>
                        <td>{book.price}</td>
                    </tr>
                    <tr>
                        <th scope="row">Total</th>
                        <td colspan="1"></td>
                        <td>{book.price}</td>
                    </tr>
                </tbody>
                </table>
                <button type="button">Check out</button>
            </div>
            
        </div>
    );
};

export default Orders;