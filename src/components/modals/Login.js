import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Signup from './Signup';

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const display = (e) => {
        console.log(e.target.value)
    }

    const handleEmail = (e) => {
        display(e)
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        display(e)
        setPassword(e.target.value)
    }

    const displaySubmit = (e) => {
        e.preventDefault()
        console.log(`Submitted Email:${email} ,with password: ${password}`)
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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
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