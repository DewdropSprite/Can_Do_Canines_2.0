import React from "react";
import {
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Link, 
} from "@mui/material";

function InfoPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: theme.spacing(3),
        backgroundColor: theme.palette.background.paper, 
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        How to Use the App
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText primary="1. Sign Up/Register: Start by creating an account to access all features." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Adding a Dog: Navigate to the 'Home' page and click the Add a Dog Profile button to input details about new dogs." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Volunteer for Hosting Opportunities: Check out 'Hosting Opportunities' to find dogs needing a host." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Update Dog Profiles: Dog profiles can be edited by using the 'Edit Profile' button on the dog's profile section." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Request a Host: If you're going away, use 'Request Care' button on the dog's profile to ensure the dog is looked after." />
        </ListItem>
      </List>
      <Typography variant="h5" sx={{ mt: 4 }}>
        FAQs
      </Typography>
      {/* Example FAQ */}
      <Typography variant="body1" paragraph>
        Q: How do I reset my password? - (for right now you just don't)
      </Typography>

      {/* Additional FAQs */}
      {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Need more help? Contact us at INSERT ACTUAL INFO HERE!{" "}
        <Link href="mailto:support@candocanines.org">
          support@candocanines.org
        </Link>
        .
      </Typography> */}
    </Box>
  );
}

export default InfoPage;
