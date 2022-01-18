import React from 'react'
 
import './home.css'
export default function Home() {
    return (
        <div>
            <div className="container-fluid bg-dark head-div">
                <h1 className="display-1">carsbnb</h1>
                <h2 className="display-3">Good cars at great price for Rentals</h2>
                <span>
                    <a routerLink="/listing" className="btn btn-success">Book Car</a>
                    <a routerLink="/listing" className="btn btn-secondary ms-3">View Cars</a>
                </span>
                <h2 className="display-3">The airbnb for cars</h2>
            </div>
        </div>
    )
}
