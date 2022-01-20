import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewCar() {
    console.log("first");
    const [brand, setBrand] = useState('')
    const [rate, setRate] = useState(0);
    const [imagesList, setImagesList] = useState({})

    function selectedAFile(images) {

        setImagesList(images);
    }

    function submitHandler(e) {
        e.preventDefault();
        // console.log(e);
        console.log(imagesList);

        const formData = new FormData()
        for (let key in imagesList) {
            console.log(key);
            console.log(imagesList[key]);
            formData.append('files', imagesList[key]);
        }
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        
        fetch('/multipleFiles/email', {
            method: 'post',
            body: formData
        })

    }
    return (
        <div className="container mb-3">
            <span className="text-center">
                <h1>Add a new car</h1>
                <h3>Earn extra income by renting your car!</h3>
            </span>
            <div className="card p-4 w-md-50">
                <form >
                    <div className="mb-3">
                        <label htmlFor="inputModel" className="form-label">Car Brand and Model</label>
                        <input type="text" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} name="model" id="inputModel" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPic" className="form-label">Image URL</label>
                        <input type="file" onChange={(e) => selectedAFile(e.target.files)} className="form-control" name="pic" id="inputPic" multiple />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputImage" className="form-label">Rental rate (per day)</label>
                        <input type="number" className="form-control" name="price" id="inputPrice" />
                    </div>

                    <button type="submit" onClick={submitHandler} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}