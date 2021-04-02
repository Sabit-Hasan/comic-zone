import React, { useState } from 'react';
import Admin from '../Admin/Admin';
import { useForm } from "react-hook-form";
import './AddProduct.css';
import axios from 'axios';

const AddProduct = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const eventData={
           name: data.name,
           weight: data.weight,
           price: data.price,
           imageURL: imageURL
        };
        const url = `http://localhost:4000/addComics`;

        fetch(url,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
        .then(res => console.log('server side response',res))
    };

    const handleImageUpload = event =>{
        const imageData = new FormData();
        imageData.set('key', '3bdab5a422c03ebcf0e2b210ff306d63');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <div>
                <Admin></Admin>
            </div>
            <div className="custom-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col">
                        Product Name <br/>
                        <input name="name"  ref={register({ required: true })} />
                    </div>
                    <div class="col">
                        Weight <br/>
                        <input name="weight" ref={register({ required: true })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Price <br/>
                        <input name="price"  ref={register({ required: true })} />
                    </div>
                    <div class="col">
                            Add Photo <br/>
                            <input onChange={handleImageUpload} name="file"  type="file" ref={register} />
                    </div>
                </div>

                {errors.exampleRequired && <span>This field is required</span>}
                
                <input type="submit" />
            </form>

                {/* <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row">
                        <div class="col">
                            Product Name
                            <input type="text" name="name" class="form-control" placeholder="Product Name" required />
                        </div>
                        <div class="col">
                            Wight
                            <input type="text" name="weight" class="form-control" placeholder="Wight" required />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            Add Price
                            <input type="text" name="price" class="form-control" placeholder="Add Price" required />
                        </div>
                        <div class="col">
                            Add Photo
                            <input onChange={handleImageUpload} style={{border:'0', boxShadow:'none'}} type="file" name="photo" class="form-control" placeholder="Wight"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">

                        </div>
                        <div class="col">
                            <input type="submit" value="Save" className="btn btn-success"/>
                        </div>
                    </div>
                </form> */}
            </div>
            
        </div>
    );
};

export default AddProduct;