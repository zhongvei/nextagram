import React from "react";
import { Navbar } from 'react-bootstrap';


const Navybar = () => {
    return (
        <Navbar bg="dark" variant="dark" style={{ position: "fixed", width: "100%" }}>
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="./nextagram.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Nextagram
            </Navbar.Brand>
        </Navbar>
    );
};

export default Navybar;