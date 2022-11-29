import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './carDetails.css'
export default function CarDetails({ imgBasePath }) {

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
        uid = JSON.parse(sessionStorage.getItem('selectedCar'));
        if (!sessioninfo) {
            alert("Please login")
            navigate('/login');
        }
        let modal = document.getElementById('bookingButton');
        fetch('https://carsbnb.azurewebsites.net/api/book', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: sessioninfo.email, uid: uid })
        });

        //alert("Car Booked!")
        modal.click();

    }
    function okay_click() {
        window.location.reload();
    }

    async function fecthCarDetail() {
        let car_id = JSON.parse(sessionStorage.getItem('selectedCar'));
        console.log(car_id);
        const res = await fetch(`https://carsbnb.azurewebsites.net/api/specificCar/${car_id}`);
        const data = await res.json();
        setSelectedCar(data.resp);
    }

    return <div>
        <div className="row mx-auto">
            <div className="mt-5 carImg">
                {selectedCar.imageUri ? <img src={imgBasePath + selectedCar.imageUri} alt="car" className="card-img-top" /> : null}
            </div>

            <div className="mt-3 d-flex flex-column justify-content-center">
                <div className="bookButton">
                    {selectedCar.isrented == '0' ? <button className="btn btn-primary btn-lg" onClick={() => bookingFn(selectedCar.uid)}>Book Now</button> : null}
                    {selectedCar.isrented == '1' ? <button className="btn btn-secondary btn-lg" disabled>Booked</button> : null}
                </div>

                <div className="car-details">
                    <h1 className='mt-2 text-center'>{selectedCar.model}</h1>
                    <h3 className='mt-2 text-center carDetailsListPricing'>Price: ₹{selectedCar.price}/day</h3>
                    <h4 className='mt-2 text-center'>Contact: {selectedCar.owner}</h4>
                    <div className="mt-2 d-flex flex-column justify-content-center description">
                        <p className='text-left'>{selectedCar.description}</p>
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
            </div>
        </div >

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-backdrop="static" style={{ display: 'none' }} id="bookingButton" data-bs-target="#bookingConfirm">
            Launch demo modal
        </button>


        <div className="modal fade" id="bookingConfirm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Booking Success!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={window.location.reload}></button>
                    </div>
                    <div className="modal-body">
                        The car has been reserved for you. You can pay and rent the car by visiting the store.
                    </div>
                    <div className="modal-footer">
                        <Link to="/listing" type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={okay_click}>Ok</Link>
                    </div>
                </div>
            </div>
        </div>


    </div >;
}
