import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Login from "./Login";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    let history = useHistory()
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passLength, setPassLength] = useState(false);
    const [click, setClick] = useState(false)
    const [errorEmail, setErrorEmail] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const handleClick = () => setClick(true)
    const handleClicked = () => setClick(false)
    const handlePasswordTrue = () => setPassLength(true);
    const handlePasswordFalse = () => setPassLength(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const display = (e) => {
        console.log(e.target.value)
    }

    const handleEmail = (e) => {
        display(e)
        setEmail(e.target.value)
    }


    useEffect(() => {
        console.log(passLength)
    }, [passLength]);


    const handlePassword = (e) => {
        display(e)
        setPassword(e.target.value)
        if (e.target.value.length >= 8) {
            handlePasswordTrue()
        } else if (e.target.value.length < 8) {
            handlePasswordFalse()
        }
    }

    const [delay, setDelay] = useState(null);
    const [usernameValid, setUsernameValid] = useState(true);

    const handleUsername = (e) => {
        display(e)
        setUsername(e.target.value)
        handleUsernameInput(e)
    }

    const checkUsername = (newUsername) => {
        axios
            .get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            )
            .then(response => {
                console.log(response.data);
                if (response.data.valid) {
                    setUsernameValid(true);
                } else {
                    setUsernameValid(false);
                }
            });
    };

    const handleUsernameInput = e => {
        clearTimeout(delay);
        const newUsername = e.target.value;
        setUsername(newUsername);
        const newDelay = setTimeout(() => {
            checkUsername(newUsername);
        }, 500);

        setDelay(newDelay);
    };

    const checkEmail = () => {
        console.log("hi")
        if (errorEmail !== []) {
            setErrorMsg(errorEmail[0])
        }
    }

    const displaySubmit = (e) => {
        e.preventDefault()
        console.log(`Submitted Username:${username} ,Submitted Email:${email} ,with password: ${password}`)
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: username,
                email: email,
                password: password
            }
        })
            .then(response => {
                console.log(response.data)
                toast.success("Logged in successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                localStorage.setItem('jwt', response.data.auth_token)
                localStorage.getItem('jwt')
                history.push(`/User/${response.data.user.id}`)
            })
            .catch(error => {
                setErrorEmail([...error.response.data.message])
                console.log("failed")
            })
    }

    useEffect(() => {
        checkEmail()
    }, [errorEmail])

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                Sign Up
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label >Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={handleUsername} onFocus={handleClick} onBlur={handleClicked} />
                            {click ?
                                passLength ? <></> : <>
                                    {username === "" ? <p className="text-muted form-text" style={{ fontSize: "0.7em" }}>Enter a username that has 5 characters</p> :
                                        username.length < 5 ? <p className="text-muted form-text" style={{ fontSize: "0.7em" }}>Enter a username that has 5 characters</p> :
                                            <> {usernameValid ? <Form.Text style={{ fontSize: "0.7em" }}>
                                                Username Valid!</Form.Text> : <Form.Text style={{ fontSize: "0.7em" }}>
                                                    Username Invalid!</Form.Text>
                                            }</>}
                                </> :
                                <></>
                            }

                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} onFocus={handleClick} onBlur={handleClicked} />
                            {click ?
                                <Form.Text className="text-muted">
                                    {errorMsg}
                                </Form.Text> :
                                <></>
                            }

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePassword} onFocus={handleClick} onBlur={handleClicked} />
                            {click ?
                                passLength ? <></> : <Form.Text className="text-muted">
                                    Password Too Short</Form.Text> :
                                <></>
                            }
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={displaySubmit} >
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Login />
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Signup