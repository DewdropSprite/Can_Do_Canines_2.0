import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const DataGrid = () => {
  const [sittingDogs, setSittingDogs] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const userDogs = useSelector((state) => state.dog.userDogs);
  const userId = useSelector((state) => state.user.id);

  const [toggle, setToggle] = useState("left");

  const handleToggle = (event, newToggle) => {
    setToggle(newToggle);
    if (newToggle === "left") {
      history.push("/datagrid");
    } else if (newToggle === "right") {
      history.push("/alldogcards");
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DOGS" });

    const fetchSitterRequests = async () => {
      try {
        const response = await axios.get("/api/sitterRequest");
        setSittingDogs(response.data);
      } catch (error) {
        console.error("Error fetching sitter requests:", error);
      }
    };

    fetchSitterRequests();
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          height: 100,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 0, 0, 0.25)",
        }}
      >
        <Typography variant="h3">Hosting Opportunities</Typography>
      </Box>

      <Box sx={{ mt: 1, mb: 2, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={toggle}
          exclusive
          onChange={handleToggle}
        >
          <ToggleButton value="left">List View</ToggleButton>
          <ToggleButton value="right">Dog Profiles View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Photo</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Volunteer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sittingDogs
              .filter((dog) => dog.start_date)
              .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
              .map((dog, index) => {
                const userOwnsDog = userDogs.some(userDog => userDog.dog_id === dog.dog_id);
                return (
                  <TableRow key={dog.id ? `dog-${dog.id}` : `index-${index}`}>
                    <TableCell component="th" scope="row">
                      <img
                        onClick={() => history.push(`/dogprofile/${dog.dog_id}`)}
                        src={dog.photo ? dog.photo : "../../Public/Images/dogoutline.jpeg"}
                        alt={`${dog.dog_name ? dog.dog_name : "Dog"}'s Profile`}
                        style={{ maxHeight: "100px", maxWidth: "100px", objectFit: "contain" }}
                      />
                    </TableCell>
                    <TableCell align="center">{dog.dog_name}</TableCell>
                    <TableCell align="center">
                      {format(new Date(dog.start_date), "MMMM d, yyyy")}
                    </TableCell>
                    <TableCell align="center">
                      {format(new Date(dog.end_date), "MMMM d, yyyy")}
                    </TableCell>
                    <TableCell align="center">
                      {!userOwnsDog && (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            history.push(`/volunteersitterform/${dog.requestId}/${dog.start_date}/${dog.end_date}`)
                          }
                        >
                          Volunteer
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataGrid;
