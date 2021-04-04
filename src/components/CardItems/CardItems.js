import React from 'react';
import { Link } from 'react-router-dom';

const CardItems = (props) => {
    const {name, imageURL,price, _id} = props.comicItem;
    return (
        <div className="card m-3" style={{width: '14rem', height: '320px'}}>
            <img style={{height:'210px'}} src={imageURL} alt=""/>
            <div className="card-body">
                <h6>{name}</h6>
                <div class="d-flex justify-content-between">
                    <Link to={`/orders/${_id}`}><button style={{height:'40px',width:'100px',color:'white'}} class="btn btn-warning">Buy Now</button></Link>
                    <h6 className="d-flex align-items-center">{price}</h6>
                </div>
            </div>
        </div>

    );
};

export default CardItems;