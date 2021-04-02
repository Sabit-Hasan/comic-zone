import React, { useEffect, useState } from 'react';
import Admin from '../Admin/Admin';
import ManageTable from '../ManageTable/ManageTable';
import Navbar from '../Navbar/Navbar';

const ManageProduct = () => {
    
    const [comics, setComics] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:4000/getComics`)
        .then(res => res.json())
        .then(data => setComics(data))
    },[])

    return (
        <div>
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <h3>This is admin panel</h3>
            </div>
            <div>
                <Admin></Admin>
            </div>
            <div className="container">
                <table className="table" style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div style={{display: 'flex', justifyContent:'center', flexWrap: 'wrap'}}>
                {
                    comics.map( comic => <ManageTable comic={comic} key={comic._id}></ManageTable>)
                }
            </div>
        </div>
    );
};

export default ManageProduct;