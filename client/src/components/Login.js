import React from 'react';
import { useState, useEffect } from 'react';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div class="container flex-container">
            <h1 class="mb-3 text-center">Login</h1>
            <div class="card p-4 w-md-50">
                <p>
                    Welcome Back! Enter the details to get going!
                    <br />
                    Don't have a account? <a routerLink="/signup">Sign up</a>
                </p>
                <form>
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" name="emailId" id="inputEmail" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" name="password" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <a routerLink="/changepassword" class="btn btn-secondary ms-3">Forgot Password</a>
                </form>
                <br />
                <p>If you dont have an account and want to try the app<br />
                    <b>without creating an account</b>
                    <br />Email: h@abc.com <br />Password: 1234567</p>
            </div>
        </div>
    );
}