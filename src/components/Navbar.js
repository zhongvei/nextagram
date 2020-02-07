import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Nav, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from './nextagram.png';
import Login from './modals/Login'
import { useHistory } from 'react-router-dom'
import Signup from './modals/Signup'



const Navybar = () => {
    const state = () => localStorage.getItem('jwt') !== null;
    const [loggedIn, setLoggedIn] = useState(state())
    const [click, setCLick] = useState(false)

    let history = useHistory()

    const loggedOut = () => {
        localStorage.removeItem('jwt')
        setCLick(true);
        history.push('/')
    }

    useEffect(() => {
        state()
    }, [click])



    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Nextagram
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/User/">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Form inline>
                        {loggedIn ? <Button variant="secondary" onClick={loggedOut}>
                            Sign Out</Button> :
                            <>
                                <Login />
                                <Signup />
                            </>}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Navybar;