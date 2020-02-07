import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadPage from './UploadPage';

const MyProfilePage = () => {
    const jwt = localStorage.getItem('jwt');
    const [isUser, setIsUser] = useState(null);
    const handleSignIn = () => setIsUser(true);
    const handleSignOut = () => setIsUser(false);

    useEffect(() => {
        axios.get("https://insta.nextacademy.com/api/v1/images/me", {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(result => {
                console.log(result)
                handleSignIn()
            })
            .catch(error => {
                console.log(error)
                handleSignOut()
            })
    })
    return (
        isUser === true ? <UploadPage /> : <></>
    )
}

export default MyProfilePage 