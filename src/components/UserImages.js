import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "react-graceful-image";
import Loading from './Loading.js'

const UserImages = ({ userId }) => {

    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com//api/v1/images?userId=${userId}`)
            .then(result => {
                setImages([...result.data]);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('ERROR: ', error);
            })
    }, [])

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    <div className="contentImageBox">
                        {images.map((image, index) => (
                            <>
                                <div key={index} >
                                    <Image
                                        src={image}
                                        alt={index}
                                        className="contentImage"
                                    />
                                </div>
                                <div>

                                </div>
                            </>
                        ))
                        }
                    </div>
                </>
            }
        </>
    )

}

export default UserImages