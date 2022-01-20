import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import CarListing from "./components/CarListing"
import Login from "./components/Login"
import CarDetails from "./components/CarDetails"
import Signup from "./components/Signup"
import NewCar from "./components/NewCar"
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<CarListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/car-details" element={<CarDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newcar" element={<NewCar/>}/>
      </Routes>
    </div>
  )
}

export default App