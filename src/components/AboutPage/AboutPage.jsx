import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

function AboutPage() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        p: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: matchesSM ? 'center' : 'flex-start',
      }}
    >
      <Typography variant= "h4" gutterBottom align={matchesSM ? "center" : "left"}>
        About This App
      </Typography>
      <Typography variant="body1" paragraph align={matchesSM ? "center" : "left"}>
        This app is a comprehensive platform designed to enhance the operational
        efficiency of Can Do Canines. Our mission is to streamline the process
        of dog adoption, training schedules, and management for both staff and
        volunteers.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Features
      </Typography>
      <Typography variant="body1" paragraph align={matchesSM ? "center" : "left"}>
        - Dog Profile Management: Keep track of all dogs, their statuses,
        medical information, and hosting requirements.
      </Typography>
      <Typography variant="body1" paragraph align={matchesSM ? "center" : "left"}>
        - Host Scheduling: Easily assign volunteers to dogs, ensuring each
        canine receives the attention and training it needs.
      </Typography>
      <Typography variant="body1" align={matchesSM ? "center" : "left"}>
        We're committed to making a difference, one dog at a time. This app is
        our step towards a more organized and efficient way of achieving our
        mission. Thank you for being a part of our journey.
      </Typography>
    </Box>
  );
}

export default AboutPage;
