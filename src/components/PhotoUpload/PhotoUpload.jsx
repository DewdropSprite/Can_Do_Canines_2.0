import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  
} from "@mui/material";
import axios from 'axios';

function PhotoUpload() {
  const { dogId } = useParams();

  let [newPhoto, setPhoto] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
      formData.append('photo', newPhoto);
    

    try {
      const response = await axios.post(`/api/dog/photo/${dogId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage('Profile photo uploaded successfully!')
      console.log("response.data:", response.data)
    } catch (error) {
      console.error("Error adding photo:", error);
      setMessage('Profile photo failed to upload')
    } finally {
      setUploading(false);
    }
  };





  return (
    <Container>
      <Typography variant='h6'>Add a Profile Picture</Typography>

    
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <TextField type="file" name="photo" onChange={handleFileChange} disabled={uploading} />
        <Button type="submit" disabled={uploading}>Upload Photo</Button>
      </form>
      {uploading && <p>Uploading...</p>}
      {message && <p>{message}</p>}
      </Container>

  );
}

export default PhotoUpload;