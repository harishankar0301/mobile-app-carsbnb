
import { useState } from 'react';
import { NavLink,Link } from 'react-router-dom'

export default function Navbar({isLoggedIn,logOut}) {

    const [isNavbarClosed, setIsNavbarClosed] = useState(true);

    function navBar() {
      let width = "0";
      if(isNavbarClosed) width = "200px";
      document.getElementById("mySidebar").style.width = width;
      setIsNavbarClosed(!isNavbarClosed);
    }
   
    return (
        <>
          <div className="openbtn" onClick={navBar}>&#9776;</div>
          <div id="mySidebar" className="sidebar">
            <a onClick={navBar}> <NavLink activeClassName="active" to="/" className="nav-link">Home</NavLink ></a>
            <a onClick={navBar}> <NavLink activeClassName="active" to="/listing" className="nav-link">View Cars</NavLink ></a>
            {isLoggedIn ?
                <>
                    <a onClick={navBar}>  <NavLink activeClassName="active" to="/newCar" className="nav-link">Add Car</NavLink ></a>
                    <a onClick={navBar}> <NavLink activeClassName="active" to="/profile" className="nav-link">Profile</NavLink ></a>
                    <a onClick={navBar}> <Link to="/" className="nav-link" onClick={logOut}>Logout</Link></a>
                </>
                :
                <>
                    <a onClick={navBar}> <NavLink activeClassName="active" to="/login" className="nav-link">Login</NavLink ></a>
                    <a onClick={navBar}><NavLink activeClassName="active" to="/signup" className="nav-link">Sign Up</NavLink ></a>
                </>}
          </div>
        </>
    )
}
