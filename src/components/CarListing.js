import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CarListing({ imgBasePath }) {

    const [loadCount, setLoadCount] = useState(12);
    const [carList, setCarList] = useState([]);

    const navigate = useNavigate()
    useEffect(() => {
        fecthCarList();
    }, [loadCount])

    async function fecthCarList() {
        const res = await fetch(`https://carsbnb.azurewebsites.net/api/list/${loadCount}`);
        const data = await res.json();
        setCarList(data.resp);
    }

    function okay_click() {
        window.location.reload();
    }
    function bookingFn(uid, owner) {
        let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
        if (!sessioninfo) {
            alert("Please login")
            navigate('/login');
            return;
        }
        if (sessioninfo.email == owner) {
            alert("This is your Car!! You can't rent your Own Car!!");
            return;
        }
        let modal = document.getElementById('bookingButton');
        modal.click();
        //alert("Car Booked!")
        fetch('https://carsbnb.azurewebsites.net/api/book', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: sessioninfo.email, uid: uid })
        });

        

    }


    function carDetails(car_uid) {
        sessionStorage.setItem('selectedCar', JSON.stringify(car_uid));
        console.log(car_uid);
        navigate('/car-details')
    }
    return (
        <div>

            <div className="container mt-3">
                <br/>
                <h1 className="text-center">
                    Car Listings

                    <div className="dropdown d-inline-block" style={{ marginLeft: '10px' }}>

                        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {loadCount} Cars
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={() => setLoadCount(50)}>50 Cars</a>
                            <a className="dropdown-item" onClick={() => setLoadCount(100)}>100 Cars</a>
                            <a className="dropdown-item" onClick={() => setLoadCount(2000)}>All Cars</a>
                        </div>
                    </div>
                </h1>

                <h4 className="text-center">View and choose which car to hire</h4>
                <br/>
               



                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

                    {carList.map((car) => (
                        <div key={car.uid} className="col">

                            <div className="card h-100 car-card shadow">
                                <img width={400} height={250} src={imgBasePath + car.imageUri} alt="car" className="card-img-top" onClick={() => carDetails(car.uid)} />
                                <div className="card-body d-flex flex-column justify-content-end p-2">
                                    <h5 className="card-title text-center text-uppercase">{car.model}</h5>
                                    <p className="card-text listPricing">Price: ₹{car.price}/day</p>
                                    {car.isrented == '0' ? <button className="btn btn-primary" onClick={() => bookingFn(car.uid, car.owner)} >Book Now</button> : ''}
                                    {car.isrented == '1' ? <button className="btn btn-secondary">Booked</button> : ''}
                                </div>
                            </div>
                        </div>


                    ))}
                </div>
            </div>


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
        </div>);
}
