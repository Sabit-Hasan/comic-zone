import React, { useEffect, useState } from 'react';
import './Home.css'
import Navbar from '../Navbar/Navbar';
import CardItems from '../CardItems/CardItems';

const Home = () => {

    const [comicItems, setComicItems] = useState([]);

    useEffect(()=>{
        fetch(`https://pure-anchorage-11283.herokuapp.com/getComics/${id}`)
        .then(res => res.json())
        .then(data =>setComicItems(data))
    },[])
    return (
        <div className='background'>
            <Navbar></Navbar>
            <div className = "container d-flex justify-content-center mt-5 pt-5 flex-wrap">
            {
                comicItems.map(comicItem => <CardItems comicItem={comicItem}></CardItems>)
            }
            </div>
        </div>
    );
};

export default Home;