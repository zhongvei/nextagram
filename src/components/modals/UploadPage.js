import React, { useState } from 'react'
import { Form, FormGroup, FormText, Button } from 'react-bootstrap'
import axios from 'axios';

const UploadPage = () => {
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')
    const [value, setValue] = useState(null)

    const setImageFile = (e) => {
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

    const handleSubmitPhoto = (e) => {
        e.preventDefault()
        let JWT = localStorage.getItem("jwt");
        let formData = new FormData();
        formData.append("image", image);
        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${JWT}` }
        })
            .then(response => {
                if (response.data.success) {
                    setMessage("Image Uploaded Successfully!")
                    setPreviewImage(null)
                    setImageFile(null)
                    setValue(null)
                }
                console.log(response.data)
            })
            .catch(error => {
                console.log(error.response);
            });
    };


    return (
        <Form onSubmit={handleSubmitPhoto} className="preview">
            <FormGroup>
                <input
                    type="file"
                    name="image-file"
                    multiple={false}
                    onChange={setImageFile}
                    value={value}
                />
                <FormText color="muted">
                    Make sure the image being uploaded is a supported format.
                </FormText>
                <div className="card">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            width="100%"
                            height="100%"
                            style={{ padding: "5px", borderRadius: "4%" }}
                        />
                    ) : (
                            <h3 className="text-center">
                                {message ? message : "Live Preview"}
                            </h3>
                        )}
                </div>
            </FormGroup>
            <Button type="submit" color="primary">
                Upload
        </Button>
        </Form>
    )
}

export default UploadPage;