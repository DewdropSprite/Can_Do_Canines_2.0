import React from 'react';
import { Modal, Box, Typography, Stack, Divider, Button } from '@mui/material';
import { format } from 'date-fns';

const DetailsModal = ({ open, handleClose, hosting }) => (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        maxWidth: '600px',  
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        border: '1px solid rgba(0, 0, 0, .75)'  
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          {hosting.dog_name} - Hosting Details
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={2}>
          <Typography variant="subtitle1">
            <strong>Hosted By:</strong> {hosting.raiser_name}
          </Typography>
          <Typography variant="body1">
            <strong>Start Date:</strong> {format(new Date(hosting.volunteer_start_date), "MMMM d, yyyy")}
          </Typography>
          <Typography variant="body1">
            <strong>End Date:</strong> {format(new Date(hosting.volunteer_end_date), "MMMM d, yyyy")}
          </Typography>
          <Typography variant="body1">
            <strong>Reason For Request:</strong> {hosting.date_comments || "No comments provided."}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Volunteer Host:</strong> {hosting.sitter_name}
          </Typography>
          <Typography variant="body1">
            <strong>Volunteer Comments:</strong> {hosting.volunteer_comments || "No comments provided."}
          </Typography>
        </Stack>
        {/* Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
        </Box>
      </Box>
    </Modal>
);

export default DetailsModal;
