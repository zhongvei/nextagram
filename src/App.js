import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Media } from 'react-bootstrap';
import Loading from './components/Loading.js';
import './App.css';




function App() {

  const [users, setUsers] = useState([])
  // const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        console.log(result.data);
        setUsers([...result.data]);
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }, [])

  return (
    <Container fluid>
      <Loading />
      {users.map(user => (
        <Row key={user.id}>
          <Media as="li">
            <img
              width={200}
              height={200}
              className="mr-3"
              src={user.profileImage}
              alt="Generic placeholder"
            />
            <Media.Body>
              <h5>{user.username}</h5>
            </Media.Body>
          </Media>

        </Row>
      ))}
    </Container >

  );
};

export default App;
