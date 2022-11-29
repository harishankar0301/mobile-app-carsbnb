import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({logIn}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const loginData = (e) => {
        e.preventDefault()
        fetch("https://carsbnb.azurewebsites.net/api/loginv", {
          method:"post",
          headers:{
              "Content-Type": "application/json",
              'Accept': 'application/json'
          },
            body: JSON.stringify({
              email:email,
              password:password
          }
            )
        })
        .then(res=>res.json())
        .then(data=>{
            if (data['resp'] == "AUTHORIZED") {
                sessionStorage.setItem('info', JSON.stringify({ email: email }))
                logIn();
                navigate('/listing')
            }
            else {
                alert("Not Authorized")
            }
        }).catch(err => {
            console.log(err)
        })
      }

    return (
        <div className='pb-3'>
            <div className="container flex-container vh-100">
                <div className="h1 mb-3 text-center">Login</div>
                <div className="card p-4 w-md-50">
                    <p>
                        Welcome Back! Enter the details to get going!
                        <br />
                        Don't have a account? <Link to="/signup">Sign up</Link>
                    </p>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email address</label>
                            <input type="email" className="form-control" name="emailId" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={loginData}>Submit</button>
                    </form>
                    <br />
                </div>
            </div>
        </div>
    );
}