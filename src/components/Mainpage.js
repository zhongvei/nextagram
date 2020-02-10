import React from 'react';
import { Row, Media, Container } from 'react-bootstrap';
import UserImages from './UserImages'
import { Link } from 'react-router-dom';


const MainPage = ({ users }) => {
    return (
        <Container fluid style={{ padding: "0px" }}>
            <Container className="firstContainer mansonry">
                {users.map(user => (
                    <Row key={user.id} style={{ margin: "0px", width: "100%" }}>
                        <Media as="div" style={{ width: "100%" }} className="biggerBox">
                            <div className="profileImage">
                                <img
                                    width={400}
                                    height={400}
                                    src={user.profileImage}
                                    alt="Generic placeholder"
                                    className="round"
                                />
                                <div className="modal">hello</div>
                                <Link to={`/User/${user.id}`} className="Link" >{user.username}</Link>
                            </div>
                            <Media.Body>
                                <UserImages userId={user.id} />
                            </Media.Body>
                        </Media>
                    </Row>
                ))
                }
            </Container>
        </Container >
    )
}

export default MainPage