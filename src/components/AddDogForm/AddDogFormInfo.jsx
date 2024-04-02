import React, { useState } from "react";
import { Grid, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

const  AddDogFormInfo = () => { 
    const history = useHistory();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        //dog basic information
    dog_name: '',
    age: '',
    breed: '',
    spayed_neutered: '',
    dog_location: ''
    })

    const handleChangeText = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    };

    const handleChangeRadioBtn = (event) => {
        const { name, value } = event.target
    console.log('radio btn', name, value)
    setFormValues({
      ...formValues,
      [name]: Number(value)
    })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
    
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <TextField
            required = {true}
            id="dog_name"
            name="dog_name"
            label="Dog Name"
            type="text"
            value={formValues.dog_name}
            onChange={handleChangeText}
          />
        </Grid>

        <Grid item>
          <TextField
            required = {true}
            id="age"
            name="age"
            label="Dog Age"
            type="number"
            helperText="Must enter a number"
            value={formValues.age}
            onChange={handleChangeText}
          />
        </Grid>

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        </Grid>

        </form>
    )
}

export default AddDogFormInfo