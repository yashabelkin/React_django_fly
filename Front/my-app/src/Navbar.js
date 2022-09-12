import React from 'react'
import { Link, } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, selectIs_admin, selectIs_staff, selectlogin, selectUsername } from './slicers/loginSlicer';
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import SkyFly from '@mui/icons-material/LocalAirport';


function CollapsibleExample() {
    const userName = useSelector(selectUsername);
    const loginStatus = useSelector(selectlogin);
    const staffStatus = useSelector(selectIs_staff);
    const adminStatus = useSelector(selectIs_admin);
    const dispatch = useDispatch()
return (
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
        
    <Navbar.Brand  as={Link} to={"/"} > <SkyFly sx={{ width: 80, height: 50 }}/>    Sky Fly </Navbar.Brand>
    
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <NavDropdown title="Information" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to={"/flights"}>All Flights</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/countries"}>Popular Destenations</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item  as={Link} to={"/"}>
            Home
            </NavDropdown.Item>
        </NavDropdown>
        {loginStatus? <NavDropdown title="My Actions" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to={"/cust"}>update profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/tickets"}>My Orders</NavDropdown.Item>
            <NavDropdown.Divider />
        </NavDropdown>:"" }
        {staffStatus? <NavDropdown title="Airline company" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to={"/air_set"}>update company profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/air_flights"}>update flights</NavDropdown.Item>
            <NavDropdown.Divider />
            
        </NavDropdown>:"" }
        {adminStatus? <NavDropdown title="Admin" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to={"/countries_admin"}>Countries</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/flights_admin"}>all Flights</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/flight_update"}>Update Flight</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/air_admin"}>Airline companies</NavDropdown.Item>
            <NavDropdown.Divider />
            
        </NavDropdown>:""}
        </Nav>
        <Nav>
            
        {loginStatus ? <Nav.Link as={Link} to={"/login"}>Log Out</Nav.Link>
        
        :
        <Nav.Link as={Link} to={"/login"}>Log in</Nav.Link>}
        
        {loginStatus ?<Nav.Link as={Link} to={"/"}>{""+ userName+ " "} </Nav.Link>:
        <NavDropdown title="Register" id="collasible-nav-dropdown">
        <NavDropdown.Item as={Link} to={"/register_cust"}>register as customer</NavDropdown.Item>
        <NavDropdown.Item as={Link} to={"/register_air"}>register as airline company</NavDropdown.Item>
        </NavDropdown>}
        </Nav>
    </Navbar.Collapse>
    </Container>
    
</Navbar>


);
}

export default CollapsibleExample;