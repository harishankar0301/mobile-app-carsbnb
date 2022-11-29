import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotoGallery } from "../hooks/usePhotoGallery";

export default function NewCar() {
    const navigate = useNavigate()
    const { takePhoto } = usePhotoGallery();
    //console.log("first");
    const [brand, setBrand] = useState('')
    const [rate, setRate] = useState(0);
    const [imagesList, setImagesList] = useState({})
    const [newFeature,setNewFeature]=useState('');
    const [featureList,setFeatureList]=useState([])
    const [description,setDescription]=useState('')

    function selectedAFile(images) {

        setImagesList(images);
    }

    function featureHandler(e){
        e.preventDefault();
        if(newFeature!=''){
            setFeatureList([...featureList,newFeature])
            setNewFeature('')
        }
    }

    function submitHandler(e) {
        e.preventDefault();

        //console.log(imagesList);
        let sessionstorage = JSON.parse(sessionStorage.getItem('info'));
        let email=sessionstorage.email
        //console.log(email);
        const formData = new FormData()
        for (let key in imagesList) {
            //console.log(key);
            //console.log(imagesList[key]);
            formData.append('files', imagesList[key]);
        }
        formData.append('carBrand',brand);
        formData.append('rate',rate)
        formData.append('features',JSON.stringify(featureList))
        formData.append('description',description)
        formData.append('email',email)
        for (var key of formData.entries()) {
            //console.log(key[0] + ', ' + key[1]);
        }

        fetch('https://carsbnb.azurewebsites.net/api/newCar', {
            method: 'post',
            body: formData
        })
        alert("Car Added!");
        navigate('/listing');

    }
    return (
        <div className="container mb-3">
            <br/>
            <span className="text-center">
                <h1>Add a new car</h1>
                <h4>Earn extra income by renting your car!</h4>
                <br/>
            </span>
            <div className="card p-4 w-md-50">
                <button onClick={takePhoto}>Open Camera</button>
                <form >
                    <div className="mb-3">
                        <label htmlFor="inputModel" className="form-label">Car Brand and Model</label>
                        <input type="text" className="form-control" value={brand} onChange={(e) => setBrand(e.target.value)} name="model" id="inputModel" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPic" className="form-label">Image</label>
                        <input type="file" accept=".jpg" onChange={(e) => selectedAFile(e.target.files)} className="form-control" name="pic" id="inputPic" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputImage" className="form-label">Rental rate (per day)</label>
                        <input type="number" className="form-control" name="price" id="inputPrice" value={rate} onChange={(e) => setRate(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDescription" className="form-label">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" name="desc" id="inputDescription" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputFeature" className="form-label">Features</label>
                        <input type="text" className="form-control" name="features" id="inputFeature" value={newFeature} onChange={(e)=>setNewFeature(e.target.value)} />
                    </div>
                    <div>
                    
                        {
                        featureList.map((feature) => (
                            <label key={feature} style={{fontSize:'13px',backgroundColor:'#2ECC71 ',color:'white',padding:'3px',borderRadius:'4px',margin:'3px'}}>{feature}</label>
                        ))
                        }
                    
                    </div>
                    <br/>
                    <button onClick={featureHandler} className="btn btn-primary">Add Feature</button><br/><br/>
                    <button type="submit" onClick={submitHandler} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}