
import { NavLink,Link } from 'react-router-dom'



export default function Navbar({isLoggedIn,logOut}) {
    function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        // document.getElementById("main").style.marginLeft = "250px";
      }
      
      function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        // document.getElementById("main").style.marginLeft= "0";
      }
   
    return (
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-left">
        //     <div className="container">

        //         <NavLink to="/" className="navbar-brand text">carsbnb</NavLink >
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ms-auto">
        //                 <li className="nav-item">
        //                     <NavLink activeClassName="active" to="/" className="nav-link">Home</NavLink >
        //                 </li>

        //                 <li className="nav-item">
        //                     <NavLink activeClassName="active" to="/listing" className="nav-link">View Cars</NavLink >
        //                 </li>

        //                 {isLoggedIn ?
        //                     <>
        //                         <li className="nav-item">
        //                             <NavLink activeClassName="active" to="/newCar" className="nav-link">Add Car</NavLink >
        //                         </li>
        //                         <li className="nav-item">
        //                             <NavLink activeClassName="active" to="/profile" className="nav-link">Profile</NavLink >
        //                         </li>
        //                         <li className="nav-item">
        //                             <Link to="/" className="nav-link" onClick={logOut}>Logout</Link>
        //                         </li>
        //                     </>

        //                     : <>
        //                         <li className="nav-item">
        //                             <NavLink activeClassName="active" to="/login" className="nav-link">Login</NavLink >
        //                         </li>


        //                         <li className="nav-item">
        //                             <NavLink activeClassName="active" to="/signup" className="nav-link">Sign Up</NavLink >
        //                         </li>
                                

        //                     </>}





        //             </ul>
        //         </div >
        //     </div >
        // </nav >

        <>
            <button className="openbtn" onClick={openNav}>&#9776;</button>
        <div id="mySidebar" className="sidebar">
  <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
  <a onClick={closeNav}> <NavLink activeClassName="active" to="/" className="nav-link">Home</NavLink ></a>
                <a  onClick={closeNav}> <NavLink activeClassName="active" to="/listing" className="nav-link">View Cars</NavLink ></a>
                {isLoggedIn ?
                    <>
                        <a  onClick={closeNav}>  <NavLink activeClassName="active" to="/newCar" className="nav-link">Add Car</NavLink ></a>
                        <a onClick={closeNav}> <NavLink activeClassName="active" to="/profile" className="nav-link">Profile</NavLink ></a>
                        <a onClick={closeNav}> <Link to="/" className="nav-link" onClick={logOut}>Logout</Link></a>
                    </>
                    :
                    <>
                        <a onClick={closeNav}> <NavLink activeClassName="active" to="/login" className="nav-link">Login</NavLink ></a>
                        <a onClick={closeNav}><NavLink activeClassName="active" to="/signup" className="nav-link">Sign Up</NavLink ></a>
                    </>}
</div>

{/* <div id="main">
  <button className="openbtn" onclick="openNav()">&#9776; Open Sidebar</button>
  <h2>Collapsed Sidebar</h2>
  <p>Content...</p>
</div> */}
        </>
    )
}
