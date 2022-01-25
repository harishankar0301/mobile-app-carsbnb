import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export default function Profile({ imgBasePath }) {
    const [email, setEmail] = useState('')
    const [carList, setCarList] = useState([]);
    const [ownCarList, setOwnCarList] = useState([]);
    const [showCarList,setShowCarList] = useState(true)
    const navigate = useNavigate()
    const [displayRented, setDisplayRented] = useState(true)
    useEffect(() => {
        let sessionstorage = JSON.parse(sessionStorage.getItem('info'));
        setEmail(sessionstorage.email)
        fecthCarList();
        fecthOwnList();
    }, [])

    // useEffect [carList]
    useEffect(()=>{
        console.log(showCarList)
    },[showCarList])

    async function fecthOwnList() {
        let sessionstorage = JSON.parse(sessionStorage.getItem('info'));
        const res = await fetch('/api/owned', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: sessionstorage.email
            })
        });
        const data = await res.json();
        //console.log(data)
        setOwnCarList(data.resp)
        //console.log(ownCarList)
    }
    async function fecthCarList() {
        let sessionstorage = JSON.parse(sessionStorage.getItem('info'));
        const res = await fetch('/api/rented/email', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: sessionstorage.email
            })
        });
        const data = await res.json();
        console.log(data)
        setCarList(data.resp);
        console.log(carList)
    }
    async function returnFn(uid) {
        let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
        if (!sessioninfo) {
            alert("Please login")
            navigate('/login');
        }
        //let modal = document.getElementById('bookingButton');
        if (window.confirm("Are you sure you want to return")) {
            const reponse = await fetch('/api/return', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: sessioninfo.email, uid: uid })
            });
            window.location.reload(false);
        }
        //modal.click()
    }
    async function delistFn(uid) {
        let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
        if (!sessioninfo) {
            alert("Please login")
            navigate('/login');
        }
        if (window.confirm("Are you sure you want to delist this car")) {
            const reponse = await fetch('/api/delist', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: sessioninfo.email, uid: uid })
            });
            window.location.reload(false);
        }
    }
    function carDetails(car_uid) {
        sessionStorage.setItem('selectedCar', JSON.stringify(car_uid));
        console.log(car_uid);
        navigate('/car-details')
    }

    return (
        <div>
            <br />
            <div className="container flex-container">
                <div className="text-center" styles="margin-top: 3%">
                    <h1 className="mb-3 text-center" style={{fontFamily: 'Trebucht MS'}}><i>Greetings, {email}!!</i></h1>
                </div>
            </div>
           
            <br />
            <div>
                <ul className="nav nav-tabs nav-fill">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" onClick={()=>setShowCarList(true)}><b><i>Rented Cars</i></b></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" onClick={()=>setShowCarList(false)}><b><i>Your Cars</i></b></a>
                    </li>
                </ul>
                <div className="tab-content">
                    {showCarList===true?(
                        <div className="container mt-3">
                             <br/>
                            <i>Your Rented Cars. Choose the ones you want to return</i>
                            <br/><br/>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

                                {carList.map((car) => (
                                    <div key={car.uid} className="card h-100 car-card">
                                        <img width={400} height={250} src={imgBasePath + car.imageUri} alt="car" className="card-img-top" onClick={() => carDetails(car.uid)} />
                                        <div className="card-body d-flex flex-column justify-content-end p-2">
                                            <h5 className="card-title text-center text-uppercase">{car.model}</h5>
                                            <p className="card-text">Price: ₹{car.price}/day</p>
                                            <button className="btn btn-primary" onClick={() => returnFn(car.uid)} >Return</button>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                        ):(
                        <div className="container mt-3">
                            <br/>
                            <i>Your Cars. Choose the ones you want to delist</i>
                            <br/><br/>
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                                {ownCarList.map((car) => (
                                    <div key={car.uid} className="card h-100 car-card">
                                        <img width={400} height={250} src={imgBasePath + car.imageUri} alt="car" className="card-img-top" onClick={() => carDetails(car.uid)} />
                                        <div className="card-body d-flex flex-column justify-content-end p-2">
                                            <h5 className="card-title text-center text-uppercase">{car.model}</h5>
                                            <p className="card-text">Price: ₹{car.price}/day</p>
                                            {car.isrented ?
                                                <button className='btn btn-secondary' disabled={true}>Rented</button>
                                                :
                                                <button className='btn btn-primary' onClick={() => delistFn(car.uid)}>Delist</button>}
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}