import './App.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import {Routes, Route } from 'react-router-dom';
import Login from './logger/Login';
import Flights from './components/basic/Flights';
import Register_air from './logger/Register_air';
import Tickets from './components/customer/Tickets';
import Countries from './components/Country';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkLogin } from './slicers/loginSlicer';
import Register_cust from './logger/Register_cust';
import AirSet from './components/airline/AirSet';
import AirFlights from './components/airline/AirFlights';
import Footer from './components/Footer';
import AirlineAD from './components/admin/AirlineAD';
import CountryAD from './components/admin/CountryAD';
import { FlightsAD } from './components/admin/FlightsAD';
import Test from './Test';
import Cust from './components/customer/Cust';
import FlightUpdate from './components/admin/FlightUpdate';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(checkLogin())
  }, [])
  return (
    <div className="App">
    <Navbar></Navbar>
    <div>
    <Routes>
        <Route path="/" element={<Test />} />
        {/* base */}
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/register_air" element={<Register_air />} />
        <Route path="/register_cust" element={<Register_cust />} />
        <Route path="/air_set" element={<AirSet />} />
        <Route path="/air_flights" element={<AirFlights />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/air_admin" element={<AirlineAD />} />
        <Route path="/flight_update" element={<FlightUpdate />} />
        <Route path="/Cust" element={<Cust />} />
        <Route path="/countries_admin" element={<CountryAD />} />
        <Route path="/flights_admin" element={<FlightsAD />} />



    </Routes>
    <Footer/>
      </div>
    </div>
  )
}
export default App;
