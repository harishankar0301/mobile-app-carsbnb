import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './carDetails.css'
export default function CarDetails() {

    const [selectedCar, setSelectedCar] = useState(
        {
            uid: "",
            pic: "",
            price: 0,
            model: "",
            description: "",
            owner: "",
            isrented: '0',
            features: [],
        });

    useEffect(() => {
        fecthCarDetail();
    }, [])

    const navigate = useNavigate()

    function bookingFn(uid) {
        let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
        if (!sessioninfo) {
            alert("Please login")
            navigate('/login');
        }
        let modal = document.getElementById('bookingButton');
        fetch('/api/book', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: sessioninfo.email, uid: uid })
        });

        modal.click();

    }

    async function fecthCarDetail() {
        let car_id = JSON.parse(sessionStorage.getItem('selectedCar'));
        console.log(car_id);
        const res = await fetch(`api/specificCar/${car_id}`);
        const data = await res.json();
        setSelectedCar(data.resp);
    }

    return <div>
        <div className="row">
            <div className="col-6 carImg">
                <img src={selectedCar.pic} alt="car" className="card-img-top" />


                <div className="bookButton">
                    {selectedCar.isrented == '0' ? <button className="btn btn-primary btn-lg" onClick={() => bookingFn(selectedCar.uid)}>Book Now</button> : null}
                    {selectedCar.isrented == '1' ? <button className="btn btn-secondary btn-lg" disabled>Booked</button> : null}
                </div>

            </div>

            <div className="col-6 car-details">
                <h1>{selectedCar.model}</h1>
                <h3>Price: ₹{selectedCar.price}/day</h3>
                <h4>Contact: {selectedCar.owner}</h4>
                <div className="description">
                    <h4>Description</h4>
                    <p>{selectedCar.description}</p>
                </div>

                <ul>
                    <h3>Features</h3>
                    {
                        selectedCar.features.map((feature) => (

                            <li key={feature} className="feature">{feature}</li>
                        ))
                    }
                </ul>
            </div >
        </div >


    </div >;
}
