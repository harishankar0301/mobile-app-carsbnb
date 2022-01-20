import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NewCar() {
    const [brand, setBrand] = useState('')
    const [rate, setRate] = useState(0);
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
                        <input type="text" className="form-control" name="model" id="inputModel" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPic" className="form-label">Image URL</label>
                        <input type="file" className="form-control" name="pic" id="inputPic" multiple />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputImage" className="form-label">Rental rate (per day)</label>
                        <input type="number" className="form-control" name="price" id="inputPrice" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}