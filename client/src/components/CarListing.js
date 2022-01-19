import React, { useState, useEffect } from 'react';


export default function CarListing({ bookingFn }) {

    const [carList, setCarList] = useState([]);

    useEffect(() => {
        fecthCarList();
    }, [])

    async function fecthCarList() {
        const res = await fetch('/api/list');
        const data = await res.json();
        setCarList(data.resp);
    }

    function booking(car_uid) {
        let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
        if (!sessioninfo) {
            alert("Please login")
            this.router.navigate([`/login`]);
        }
        let modal = document.getElementById('bookingButton');

    }
    return (
        <div>

            <div className="container mt-3">
                <h1 className="text-center">
                    Car Listings
                </h1>
                <h3 className="text-center">View and choose which car to hire</h3>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

                    {carList.map((car) => (
                        <div key={car.uid} className="card h-100 car-card">
                            <img width={400} height={250} src={car.pic} alt="car" className="card-img-top" />
                            <div className="card-body d-flex flex-column justify-content-end p-2">
                                <h5 className="card-title text-center text-uppercase">{car.model}</h5>
                                <p className="card-text">Price: ₹{car.price}/day</p>
                                {car.isrented == '0' ? <button className="btn btn-primary" onClick={() => bookingFn(car.uid)} >Book Now</button> : ''}
                                {car.isrented == '1' ? <button className="btn btn-secondary">Booked</button> : ''}
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>);
}
