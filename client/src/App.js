import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import CarListing from "./components/CarListing"
import Login from "./components/Login"
import CarDetails from "./components/CarDetails"
import Signup from "./components/Signup"
import NewCar from "./components/NewCar"

import { useState, useEffect } from 'react';
function App() {

  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logout() {
    setIsLoggedIn(false);
    sessionStorage.clear();
    navigate('/');
  }
  function login() {
    setIsLoggedIn(true);
  }
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('info'))) {
      setIsLoggedIn(true);
    }
  }, [])

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} logOut={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<CarListing />} />
        <Route path="/login" element={<Login logIn={login} />} />
        <Route path="/car-details" element={<CarDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newcar" element={<NewCar/>}/>
      </Routes>
    </div>
  )
}

export default App