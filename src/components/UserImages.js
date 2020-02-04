import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "react-graceful-image";

const UserImages = ({ userId }) => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com//api/v1/images?userId=${userId}`)
            .then(result => {
                setImages([...result.data])
            })
            .catch(error => {
                console.log('ERROR: ', error)
            })
    }, [])

    return (
        <div className="contentImageBox">
            {images.map((image, index) => (
                <div key={index} >
                    <Image
                        src={image}
                        alt={index}
                        className="contentImage"
                    />
                </div>
            ))
            }
        </div>
    )

}

export default UserImages