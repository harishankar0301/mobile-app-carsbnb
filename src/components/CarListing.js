import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Geolocation } from '@ionic-native/geolocation';

var carOption = 'Default';
var locationCity = '';

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
        if (loadCount != 12) carOption = loadCount + ' Cars';

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


    async function getCarsByLocation() {
        const position = await Geolocation.getCurrentPosition();
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);

        //const res = await fetch(`https://carsbnb.azurewebsites.net/api/specificCar/${car_id}`);
        let res = [{ "name": "Chennai", "local_names": { "te": "చెన్నై", "ta": "சென்னை", "hi": "चेन्नई", "fr": "Chennai", "bn": "চেন্নাই", "ru": "Ченнаи", "ml": "ചെന്നൈ", "he": "צ'נאי", "zh": "金奈", "kn": "ಚೆನ್ನೈ", "ja": "チェンナイ", "uk": "Ченнаї", "lt": "Čenajus", "mr": "चेन्नई", "ur": "چنئی", "ko": "첸나이", "de": "Chennai", "pl": "Ćennaj", "tr": "Madras", "cs": "Čennaí", "en": "Chennai", "ar": "تشيناي" }, "lat": 13.0836939, "lon": 80.270186, "country": "IN", "state": "Tamil Nadu" }]
        let data = res;
        let city = data[0].name;
        console.log(city);
        locationCity = city;
        carOption = 'Cars by Location';

        res = await fetch(`https://carsbnb.azurewebsites.net/api/list/location/${city}`);
        // res = await fetch(`http://localhost:8080/api/list/location/${city}`);
        data = await res.json();
        setCarList(data.resp);
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
                            {/* {loadCount} Cars */}
                            {carOption}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={() => setLoadCount(50)}>50 Cars</a>
                            <a className="dropdown-item" onClick={() => setLoadCount(100)}>100 Cars</a>
                            <a className="dropdown-item" onClick={() => setLoadCount(2000)}>All Cars</a>
                            <a className="dropdown-item" onClick={() => getCarsByLocation()}>Cars by Location</a>
                        </div>
                    </div>
                </h1>

                {/* <h4 className="text-center">View and choose which car to hire</h4> */}
                {locationCity != '' ?
                    <>
                        <span className='loc-icon  text-center'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>   {locationCity}</span>
                    </>
                    :
                    <></>
                }



               



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
