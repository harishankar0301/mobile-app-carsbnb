
import { NavLink,Link } from 'react-router-dom'



export default function Navbar({isLoggedIn,logOut}) {

   
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">

                <NavLink to="/" className="navbar-brand text">carsbnb</NavLink >
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink activeClassName="active" to="/" className="nav-link">Home</NavLink >
                        </li>

                        <li className="nav-item">
                            <NavLink activeClassName="active" to="/listing" className="nav-link">View Cars</NavLink >
                        </li>

                        {isLoggedIn ?
                            <>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" to="/newCar" className="nav-link">Add Car</NavLink >
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link" onClick={logOut}>Logout</Link>
                                </li>
                            </>

                            : <>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" to="/login" className="nav-link">Login</NavLink >
                                </li>


                                <li className="nav-item">
                                    <NavLink activeClassName="active" to="/signup" className="nav-link">Sign Up</NavLink >
                                </li>

                            </>}





                    </ul>
                </div >
            </div >
        </nav >
    )
}
