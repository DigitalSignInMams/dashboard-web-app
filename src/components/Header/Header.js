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
import "./Header.css";



function Header() {



    return (
        
        <Navbar bg="danger" expand="lg">
            <Container className="maxwidth-none">
            <Navbar.Brand href="#home" className="text-white">Mass Academy Attendance Console</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                {/* <Nav.Link onClick={handleAdd} className="text-secondary">Create New Event</Nav.Link> */}
                {/* <Nav.Link href="#link" className="text-secondary">Link</Nav.Link> */}

            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

    );

}

export default Header;
