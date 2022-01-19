import React, { useState, useEffect } from 'react';
export default function CarDetails() {

    const [selectedCar, setSelectedCar] = useState(
        selectedCar = {
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

    function booking(uid) {
        let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
        if (!sessioninfo) {
            alert("Please login")
            this.router.navigate([`/login`]);
        }
        let modal = document.getElementById('bookingButton');
        fetch('/api/book',{method:'post'})
        this.http.post(`${backEndUrl}/api/book`, { email: sessioninfo["email"], uid: uid }).subscribe(res => {
            console.log(res);

        })
        modal.click();

    }

    async function fecthCarDetail() {
        let car_id = JSON.parse(sessionStorage.getItem('selectedCar'));
        console.log(car_id);
        const res = await fetch(`api/specificCar/${car_id}`);
        const data = await res.json();
        setCarList(data.resp);
    }

    return <div>
        <div className="row">
            <div className="col-6 carImg">
                <img src={selectedCar.pic} alt="car" className="card-img-top" />


                <div className="bookButton">
                    {selectedCar.isrented == '0' ? <button className="btn btn-primary btn-lg" onClick={booking(selectedCar.uid)}>Book Now</button> : null}
                    {selectedCar.isrented == '1' ? <button className="btn btn-secondary btn-lg" disabled>Booked</button> : null}
                </div>

            </div>

            <div className="col-6 car-details">
                <h1>{selectedCar.model}</h1>
                <h2>Price: ₹{selectedCar.price}/day</h2>
                <h2>Contact: {selectedCar.owner}</h2>
                <div className="description">
                    <h4>Description</h4>
                    <p class>{selectedCar.description}</p>
                </div>

                <ul>
                    <h3>Features</h3>
                    {
                        selectedCar.features.map((feature) => {
                            <li className="feature">{feature}</li>
                        })
                    }



                </ul>

            </div >
        </div >


    </div >;
}
