import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import './App.css';
import { Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import MainPage from './components/Mainpage';
import Navybar from './components/Navbar';
import UserProfilePage from './components/UserProfilePage';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import UploadPage from './components/modals/UploadPage';


function App() {

  const [users, setUsers] = useState([])
  const [isLoading, setisLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') !== null)
  const handleLogIn = () => setLoggedIn(true)
  const handleLogOut = () => setLoggedIn(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  let history = useHistory()

  const loggedOut = () => {
    localStorage.removeItem('jwt')
    handleLogOut()
    history.push('/')
  }

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        setUsers([...result.data]);
        setisLoading(false);
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }, [])

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
        localStorage.setItem('id', result.data.user.id)
        history.push(`/User/${result.data.user.id}`)
        handleLogIn()
      })
      .catch(error => {
        console.log("failed")
        toast.error("Log In Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      })
  }

  return (
    isLoading ? <Loading /> :
      <>

        <Navybar displaySubmit={displaySubmit} loggedOut={loggedOut} handlePassword={handlePassword} handleUsername={handleUsername} handleShow={handleShow} handleClose={handleClose} show={show} loggedIn={loggedIn} />
        <ToastContainer />
        <Route exact path="/" component={() => <MainPage users={users} />} />
        <Route exact path="/User/:id" component={() => <UserProfilePage users={users} />} />
        <Route exact path="/User/MyProfilePage/UploadImage" component={() => <UploadPage />} />
      </>
  );
};

export default App;
