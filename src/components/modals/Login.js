import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Signup from './Signup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'


const Login = () => {
    let history = useHistory()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const display = (e) => {
        console.log(e.target.value)
    }

    const handleUsername = (e) => {
        display(e)
        setUsername(e.target.value)
    }
    const handlePassword = (e) => {
        display(e)
        setPassword(e.target.value)
    }

    const displaySubmit = (e) => {
        e.preventDefault()
        console.log(`Submitted username:${username} ,with password: ${password}`)
        axios({
            method: 'post',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: username,
                password: password
            }
        })
            .then(result => {
                console.log(result)
                toast.success("Logged in successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                localStorage.setItem('jwt', result.data.auth_token)
                localStorage.getItem('jwt')
                history.push(`/User/${result.data.user.id}`)
            })
    }


    return (
        <>
            <Button variant="secondary" onClick={handleShow} className="space">
                Login
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={handleUsername} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={displaySubmit}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Signup>
                    </Signup>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Login