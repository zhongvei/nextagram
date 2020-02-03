import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Loading from './components/Loading.js';
import './App.css';
import MainPage from './components/Mainpage.js';
import Navybar from './components/Navbar.js';

function App() {

  const [users, setUsers] = useState([])
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        console.log(result.data);
        setUsers([...result.data]);
        setisLoading(false);
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }, [])

  return (
    <Container fluid style={{ padding: "0px" }}>
      <Navybar />
      {isLoading ? <Loading /> : <MainPage users={users} />};
    </Container >

  );
};

export default App;
