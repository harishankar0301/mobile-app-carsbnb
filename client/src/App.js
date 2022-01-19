import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import CarListing from "./components/CarListing"
import Login from "./components/Login"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<CarListing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App