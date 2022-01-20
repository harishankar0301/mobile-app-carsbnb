import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signupData = (e) => {
        e.preventDefault()
        fetch("/api/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            }
            )
        }).then(res=>res.json())
        .then(data=>{
            if (data['resp'] == "SUCCESS") {
                sessionStorage.setItem('info', JSON.stringify({ email: email }))
                navigate('/listing')
            }
            else {
                alert("Sign Up Unsuccessful. Try again")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="container flex-container">
            <h1 className="mb-3 text-center">Sign Up</h1>
            <div className="card p-4 w-md-50">
                <p>
                    Hi, welcome to our service! Enter the corresponding details to get started!
                    <br />
                    Already have a account? <Link to="/login">Login</Link>
                </p>
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">User Name</label>
                        <input type="text" className="form-control" name="name" id="inputName" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="emailId" id="inputEmail" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="inputPassword" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={signupData}>Submit</button>
                </form>
            </div>
        </div>
    );
}