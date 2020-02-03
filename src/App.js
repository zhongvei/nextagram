import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './App.css';




function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        setUsers([...result.data]);
        console.log(users)
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
  }, [])

  return (
    < Container fluid >
      {users.map(user => (
        <Row>
          <Col sm={12} key={user.id}>
            <Image src={user.profileImage} roundedCircle style={{ width: "20%" }} />
          </Col>
        </Row>
      ))}
    </Container >

  );
};

export default App;
