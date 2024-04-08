import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const AdminHome = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const requests = useSelector((store) => store.adminReducer);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    dispatch({ type: "FETCH_REQUESTS" });
  }, [dispatch]);

  console.log("requests:", requests);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredRequests = requests?.filter((request) => {
    if (filter === "pending") return request.status === null;
    if (filter === "confirmed") return request.status === true;
    if (filter === "denied") return request.status === false;
  });

  return (
    <>
      <Box sx={{ marginBottom: 2 }}>
        <ToggleButtonGroup
          color="primary"
          value={filter}
          exclusive
          onChange={handleFilterChange}
        >
          <ToggleButton value="pending">Pending</ToggleButton>
          <ToggleButton value="confirmed">Confirmed</ToggleButton>
          <ToggleButton value="denied">Denied</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="admin table">
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Dog's Name</TableCell>
              <TableCell>Dates Needed</TableCell>
              <TableCell>Current Host Name</TableCell>
              <TableCell>Future Host Name</TableCell>
              <TableCell>Dates Available</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests?.map((request, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <img
                    onClick={() =>
                      history.push(`/dogprofile/${request.dog_id}`)
                    }
                    src={
                      request.photo
                        ? request.photo
                        : "../../Public/Images/dogoutline.jpeg"
                    }
                    alt={`${
                      request.dog_name ? request.dog_name : "dog"
                    } 's Profile`}
                    style={{
                      maxHeight: "100px",
                      maxWidth: "100px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </TableCell>
                <TableCell>{request.dog_name}</TableCell>
                <TableCell>
                  {format(new Date(request.volunteer_start_date), "MM/dd/yyyy")}{" "}
                  to{" "}
                  {format(new Date(request.volunteer_end_date), "MM/dd/yyyy")}
                </TableCell>
                <TableCell>{request.host_name}</TableCell>
                <TableCell>{request.volunteer_name}</TableCell>
                <TableCell>
                  {format(new Date(request.host_start_date), "MM/dd/yyyy")} to{" "}
                  {format(new Date(request.host_end_date), "MM/dd/yyyy")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      dispatch({
                        type: "SET_CONFIRMATION",
                        payload: {
                          status: true,
                          hostId: request?.volunteer_id,
                        },
                      })
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      dispatch({
                        type: "DENY_CONFIRMATION",
                        payload: {
                          status: false,
                          hostId: request?.volunteer_id,
                        },
                      })
                    }
                  >
                    Deny
                  </Button>
                </TableCell>
                <TableCell>{request.status !== null ? (request.status ? "Confirmed" : "Denied") : "Pending"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminHome;
