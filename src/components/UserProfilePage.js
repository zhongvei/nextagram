import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from "react-graceful-image";
import { useParams } from 'react-router-dom';
import { Row, Container, Media, Col } from 'react-bootstrap';
import Loading from './Loading.js'

const UserProfilePage = () => {
    let { id } = useParams();
    const [images, setImages] = useState([]);
    const [users, setUsers] = useState('');
    const [isLoading, SetIsLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://insta.nextacademy.com//api/v1/images?userId=${id}`)
            .then(result => {
                setImages([...result.data])
                SetIsLoading(false);
            })
            .catch(error => {
                console.log('ERROR: ', error)
            })
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
            .then(result => {
                setUsers(result.data)
            })
            .catch(error => {
                console.log('ERROR: ', error)
            })
    }, [])

    console.log(users)

    return (
        isLoading ? <Loading /> :
            <>
                <Container fluid>
                    <Row key={users.id} style={{ margin: "0px" }}>
                        <Media as="div" style={{ width: "100%" }} className="biggerBox1">
                            <div className="profileImage">
                                <img
                                    width={400}
                                    height={400}
                                    src={users.profileImage}
                                    alt="Generic placeholder"
                                    className="round"
                                />
                                <h1 className="username">{users.username}</h1>
                            </div>
                        </Media>
                    </Row>
                    <Row>
                        <Col>
                            <div className="masonry">
                                {images.map((image, index) => (
                                    <div key={index} >
                                        <Image
                                            src={image}
                                            alt={index}
                                            className="item"
                                        />
                                    </div>
                                ))
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>

    )

}

export default UserProfilePage