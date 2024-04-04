import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import axios from "axios";

function PhotoUpload({ onClose }) {
  const { dogId } = useParams();

  let [newPhoto, setPhoto] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(" ");

  let history = useHistory();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("photo", newPhoto);

    try {
      await axios.post(`/api/dog/photo/${dogId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Profile photo uploaded successfully!");
    } catch (error) {
      console.error("Error adding photo:", error);
      setMessage("Profile photo failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const handleCloseAndPush = () => {
    onClose();
    history.push(`/dogprofile/${dogId}`)
  }

  return (
    <Container>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Profile Picture
      </Typography>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          fullWidth
          variant="outlined"
          type="file"
          name="photo"
          onChange={handleFileChange}
          disabled={uploading}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {" "}
          {/* Add margin top for spacing */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={uploading}
          >
            Upload Photo
          </Button>
        </Box>
      </form>
      {uploading && <p>Uploading...</p>}
      {message && <p>{message}</p>}
      {message === "Profile photo uploaded successfully!" && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button onClick={handleCloseAndPush}>Close</Button>
          </Box>
      )}
    </Container>
  );
}

export default PhotoUpload;
