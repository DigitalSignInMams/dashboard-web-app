import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Datetime from 'react-datetime';
import moment from "moment";
import MomentUtils from "../../utils/MomentUtils";
import RequestUtils from "../../utils/RequestUtils";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import logo from "../../logo.png"
import "./Header.css";



function Header(props) {

    let [currentTabName, setCurrentTabName] = useState("");

    useEffect(() => {
        if(window.location.pathname == "/") {
            setCurrentTabName("none")
        }
      }, []);

    return (
        <Navbar className="color-nav" variant="dark">
        <Container className="maxwidth-none">
            <Navbar.Brand href="#home">
            <img
              src={logo}
              width="95"
              height="80"
              className="d-inline-block align-top mx-2"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home">Mass Academy Attendance Portal</Navbar.Brand>
  
          <Nav className={currentTabName + " me-auto"}>
            <Nav.Link href={"/calendar/" + moment().unix()}>Home</Nav.Link>
            <Nav.Link href="/calendar">Calendar</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
 
          <Button className={currentTabName + " mx-2"} variant="dark" href="/logout">
            Logout
          </Button>
         
        </Container>
      </Navbar>
        // <Navbar bg="danger" variant="dark" expand="lg">
        //     <Container className="maxwidth-none">
        //     <Navbar.Brand href="#home">Mass Academy Attendance Console</Navbar.Brand>
        //     <Nav className="me-auto">
        //     <Nav.Link href="#home">Home</Nav.Link>
        //     <Nav.Link href="#features">Features</Nav.Link>
        //     <Nav.Link href="#pricing">Pricing</Nav.Link>
        //   </Nav>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //     <Nav className="ms-auto">
        //         {/* <Nav.Link onClick={handleAdd} className="text-secondary">Create New Event</Nav.Link> */}
        //         {/* <Nav.Link href="#link" className="text-secondary">Link</Nav.Link> */}

        //     </Nav>
        //     </Navbar.Collapse>
        // </Container>

        // </Navbar>

    );

}

export default Header;
