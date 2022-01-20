import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const loginData = (e) => {
        e.preventDefault()
        fetch("/api/loginv", {
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
        <div className="container flex-container">
            <h1 className="mb-3 text-center">Login</h1>
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
                    <Link to="/changepassword" className="btn btn-secondary ms-3">Forgot Password</Link>
                </form>
                <br />
                <p>If you dont have an account and want to try the app<br />
                    <b>without creating an account</b>
                    <br />Email: h@abc.com <br />Password: 1234567</p>
            </div>
        </div>
    );
}