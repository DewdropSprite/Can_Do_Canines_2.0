import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Container,
} from "@mui/material";

import DetailsModal from "./DetailsModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { format, isFuture, isPast, parseISO } from "date-fns";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const doggos = useSelector((store) => store.raiserDogReducer);
  const { hostingData, loading, error } = useSelector(
    (state) => state.hostingReducer
  );
  const [sitterDates, setSitterDates] = useState([]);
  const userId = useSelector((state) => state.user.id);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenModal = (hosting) => {
    setSelectedData(hosting);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_HOSTING_INFO" });
    dispatch({ type: "FETCH_USER_DOGS" });
    axios
      .get("/api/sitterRequest")
      .then((response) => setSitterDates(response.data))
      .catch((error) =>
        console.error("Error fetching sitter requests:", error)
      );
  }, [dispatch]);

  return (
    <>
      {/* <Box
        sx={{
          height: 100,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 0, 0, 0.25)",
        }}
      > */}
        {/* <Typography variant="h3">Landing Page</Typography>
      </Box>

      <Box
        sx={{
          height: 150,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      <Box sx={{ py: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" textAlign="center">Dogs You are Hosting</Typography>
      </Box>
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {doggos.map((dog, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card elevation={4} onClick={() => history.push(`/dogprofile/${dog.dog_id}`)}>
                <CardContent sx={{ textAlign: "center" }}>
                <img
                    src={
                      dog.photo
                        ? dog.photo
                        : "../../Public/Images/dogoutline.jpeg"
                    }
                    alt={`Profile of ${dog.dog_name ? dog.dog_name : "dog"}`}
                    style={{
                      height: "100%",
                      width: "auto",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <Typography gutterBottom variant="h6" component="div">
                    {dog.dog_name}
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => history.push(`/dogprofile/${dog.dog_id}`)}>
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => history.push("/add-dog-form")}
          >
            Add a Dog Profile
          </Button>
        </Box>
      </Container>
      <Container>
        <Box sx={{ py: 2, bgcolor: 'primary.main', color: 'white', mt: 4 }}>
          <Typography variant="h4" textAlign="center">Your Hosting Commitments</Typography>
        </Box>
        <Grid container spacing={3}>
          {/* Past Dogs Hosted */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Completed Hosting</Typography>
            {hostingData.filter(hosting => isPast(new Date(hosting.volunteer_end_date)) && hosting.sitter_id === userId)
              .map((hosting, index) => (
                <Card key={index} sx={{ mb: 2, elevation: 4 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body1">{hosting.dog_name}</Typography>
                    <Typography variant="body2">
                      Start: {format(new Date(hosting.volunteer_start_date), "MMMM d, yyyy")}
                    </Typography>
                    <Typography variant="body2">
                      End: {format(new Date(hosting.volunteer_end_date), "MMMM d, yyyy")}
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => handleOpenModal(hosting)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </Grid>

          {/* Future & Confirmed */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Future & Confirmed</Typography>
            {hostingData.filter(hosting => isFuture(new Date(hosting.volunteer_end_date)) && hosting.status === true && hosting.sitter_id === userId)
              .map((hosting, index) => (
                <Card key={index} sx={{ mb: 2, elevation: 4 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body1">{hosting.dog_name}</Typography>
                    <Typography variant="body2">
                      Start: {format(new Date(hosting.volunteer_start_date), "MMMM d, yyyy")}
                    </Typography>
                    <Typography variant="body2">
                      End: {format(new Date(hosting.volunteer_end_date), "MMMM d, yyyy")}
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => handleOpenModal(hosting)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </Grid>

          {/* Future & Not Confirmed */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Future & Not Confirmed</Typography>
            {hostingData.filter(hosting => isFuture(new Date(hosting.volunteer_end_date)) && hosting.status == null && (hosting.sitter_id === userId || hosting.raiser_id === userId))
              .map((hosting, index) => (
                <Card key={index} sx={{ mb: 2, elevation: 4 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body1">{hosting.dog_name}</Typography>
                    <Typography variant="body2">
                      Start: {format(new Date(hosting.volunteer_start_date), "MMMM d, yyyy")}
                    </Typography>
                    <Typography variant="body2">
                      End: {format(new Date(hosting.volunteer_end_date), "MMMM d, yyyy")}
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => handleOpenModal(hosting)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </Grid>
        </Grid>
      </Container>
      {selectedData && (
        <DetailsModal
          open={modalOpen}
          handleClose={handleCloseModal}
          hosting={selectedData}
        />

      )}
    </>
  );
};

export default HomePage;
