import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from './components/Loading.js';
import './App.css';
import { Route } from "react-router-dom";
import MainPage from './components/Mainpage.js';
import Navybar from './components/Navbar.js';
import UserProfilePage from './components/UserProfilePage';

function App() {

  const [users, setUsers] = useState([])
  const [isLoading, setisLoading] = useState(true);

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

  return (
    isLoading ? <Loading /> :
      <>
        <Navybar />
        <Route exact path="/" component={() => <MainPage users={users} />} />
        <Route path="/User/:id" component={() => <UserProfilePage users={users} />} />
      </>
  );
};

export default App;
