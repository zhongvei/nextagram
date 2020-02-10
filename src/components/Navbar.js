import React from "react";
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from './nextagram.png';
import Login from './modals/Login';
import Signup from './modals/Signup';
import { useHistory } from 'react-router-dom'


const Navybar = ({ displaySubmit, loggedOut, handlePassword, handleUsername, handleShow, handleClose, show, loggedIn, address }) => {
    let history = useHistory()
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
                    </Nav>

                    <Form inline>
                        {loggedIn ? <><Button variant="secondary" onClick={loggedOut}>
                            Sign Out</Button> <Button variant="secondary" onClick={history.push(address)}>
                                My Profile</Button></> :
                            <>
                                <Login displaySubmit={displaySubmit} show={show} handleClose={handleClose} handleShow={handleShow} handleUsername={handleUsername} handlePassword={handlePassword} />
                                <Signup />
                            </>}
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Navybar;