import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

const ManageTable = (props) => {

    const {name, weight, price, _id} = props.comic;

    const deleteProduct = (id) =>{
        fetch(`http://localhost:4000/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result =>{
            console.log('deleted successfully!')
        })
    }

    return (
        <div className="container">
            {
                <table className="table" style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <tbody>
                    <tr>
                    <th>{name}</th>
                    <td>{weight}</td>
                    <td>{price}</td>
                    <td><FontAwesomeIcon onClick={() => deleteProduct(_id)} icon={faTrashAlt}/> <FontAwesomeIcon icon={faEdit}/></td>
                    </tr>
                </tbody>
                </table>
            }

            {/* {
                <div className="row">
                    <div className="col-md-3">{name}</div>
                    <div className="col-md-3">{weight}</div>
                    <div className="col-md-3">{price}</div>
                    <div className="col-md-3">00</div>
                </div>
            } */}
        </div>
    );
};

export default ManageTable;