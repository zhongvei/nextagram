import React from 'react';
import { Row, Media, Container } from 'react-bootstrap';
import UserImages from './UserImages'

const MainPage = ({ users }) => {
    return (
        <Container className="firstContainer mansonry">
            {users.map(user => (
                <Row key={user.id} style={{ margin: "0px" }}>
                    <Media as="div" style={{ width: "100%" }} className="biggerBox">
                        <div className="profileImage">
                            <img
                                width={400}
                                height={400}
                                src={user.profileImage}
                                alt="Generic placeholder"
                                className="round"
                            />
                            <h1>{user.username}</h1>
                        </div>

                        <Media.Body>
                            <UserImages userId={user.id} />
                        </Media.Body>
                    </Media>
                </Row>
            ))
            }
        </Container>
    )
}

export default MainPage