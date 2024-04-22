import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { format, isFuture, isPast } from "date-fns";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const doggos = useSelector((store) => store.raiserDogReducer);
  const { hostingData, loading, error } = useSelector(state => state.hostingReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_HOSTING_INFO' });
  }, [dispatch]);

  return (
    <>
      <Box sx={{ height: 100, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1px solid rgba(255, 0, 0, 0.25)" }}>
        <Typography variant="h3">Landing Page</Typography>
      </Box>

      <Box sx={{ height: 150, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4">Dogs You are Hosting</Typography>
      </Box>

      <Container>
    <Box sx={{
        height: 150,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "1px solid rgba(255, 0, 0, 0.25)",
    }}>
        <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
            Your Hosting Opportunities
        </Typography>
    </Box>

    {loading ? (
        <Typography variant="h6" align="center">Loading...</Typography>
    ) : error ? (
        <Typography variant="h6" align="center">Error: {error}</Typography>
    ) : (
        <Grid container spacing={2}>
            {/* Past Dogs Hosted */}
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" gutterBottom sx={{ height: 75, display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    Completed Hosting Commitments
                </Typography>
                {hostingData.filter(hosting => isPast(new Date(hosting.volunteer_end_date))).map((hosting, index) => (
                    <Card key={index} sx={{ mb: 2, border: "1px solid rgba(0, 0, 0, 0.2)" }}>
                        <CardContent>
                            <Typography variant="body1" sx={{ textAlign: "center" }}>
                                {hosting.dog_name} - Hosted by {hosting.volunteer_name}
                            </Typography>
                            <Typography variant="body2">
                                Start: {format(new Date(hosting.volunteer_start_date), "MMMM d, yyyy, h:mm a")}
                            </Typography>
                            <Typography variant="body2">
                                End: {format(new Date(hosting.volunteer_end_date), "MMMM d, yyyy, h:mm a")}
                            </Typography>
                            <img src={hosting.photo} alt="Dog" style={{ width: '100%', marginTop: '10px' }} />
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                {hosting.volunteer_comments}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>

            {/* Confirmed Commitments */}
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" gutterBottom sx={{ height: 75, display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    Upcoming Confirmed Commitments
                </Typography>
                {hostingData.filter(hosting => hosting.status === "confirmed" && isFuture(new Date(hosting.volunteer_end_date))).map((hosting, index) => (
                    <Card key={index} sx={{ mb: 2, border: "1px solid rgba(0, 0, 0, 0.2)" }}>
                        <CardContent>
                            <Typography variant="body1" sx={{ textAlign: "center" }}>
                                {hosting.dog_name} - Hosted by {hosting.volunteer_name}
                            </Typography>
                            <Typography variant="body2">
                                Start: {format(new Date(hosting.volunteer_start_date), "MMMM d, yyyy, h:mm a")}
                            </Typography>
                            <Typography variant="body2">
                                End: {format(new Date(hosting.volunteer_end_date), "MMMM d, yyyy, h:mm a")}
                            </Typography>
                            <img src={hosting.photo} alt="Dog" style={{ width: '100%', marginTop: '10px' }} />
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                {hosting.volunteer_comments}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>

            {/* Requests Awaiting Confirmation */}
            <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" gutterBottom sx={{ height: 75, display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    Hosting Requests Awaiting Admin Confirmation
                </Typography>
                {hostingData.filter(hosting => hosting.status !== "confirmed" && isFuture(new Date(hosting.volunteer_end_date))).map((hosting, index) => (
                    <Card key={index} sx={{ mb: 2, border: "1px solid rgba(0, 0, 0, 0.2)" }}>
                        <CardContent>
                            <Typography variant="body1" sx={{ textAlign: "center" }}>
                                {hosting.dog_name} - Hosted by {hosting.volunteer_name}
                            </Typography>
                            <Typography variant="body2">
                                Start: {format(new Date(hosting.volunteer_start_date), "MMMM d, yyyy, h:mm a")}
                            </Typography>
                            <Typography variant="body2">
                                End: {format(new Date(hosting.volunteer_end_date), "MMMM d, yyyy, h:mm a")}
                            </Typography>
                            <img src={hosting.photo} alt="Dog" style={{ width: '100%', marginTop: '10px' }} />
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                {hosting.volunteer_comments}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Grid>
    )}
</Container>

    </>
  );
};

export default HomePage;