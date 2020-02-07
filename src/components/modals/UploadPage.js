import React, { useState } from 'react'
import { Form, FormGroup, FormText, Button } from 'react-bootstrap'

const UploadPage = () => {
    const [image, setImage] = useState(null)

    const setImageFile = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <Form>
            <FormGroup>
                <input
                    type="file"
                    name="image-file"
                    onChange={setImageFile}
                />
                <FormText color="muted">
                    Make sure the image being uploaded is a supported format.
            </FormText>
            </FormGroup>
            <Button type="submit" color="primary">
                Upload
        </Button>
        </Form>
    )
}

export default UploadPage;