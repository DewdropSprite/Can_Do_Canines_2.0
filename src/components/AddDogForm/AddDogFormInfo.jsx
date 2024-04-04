import React, { useState } from "react";
import { Grid, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

const AddDogFormInfo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        //dog basic information
        dog_name: '',
        age: '',
        gender: '',
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
                        required={true}
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
                        required={true}
                        id="age"
                        name="age"
                        label="Dog Age"
                        type="number"
                        helperText="Must enter a number"
                        value={formValues.age}
                        onChange={handleChangeText}
                    />
                </Grid>

                <Grid item>
                    <FormControl>
                        <FormLabel id="breed">Dog Breed</FormLabel>
                        <RadioGroup
                            value={formValues.breed}
                            required={true}
                            onChange={handleChangeRadioBtn}
                            name="breed"
                        >

                            <FormControlLabel key={1} value={1} control={<Radio required={true}/>} label="Labrador" />
                            <FormControlLabel key={2} value={2} control={<Radio required={true}/>} label="Golden Retriever" />
                            <FormControlLabel key={3} value={3} control={<Radio required={true} />} label="Labrador Mix" />
                            <FormControlLabel key={4} value={4} control={<Radio required={true}/>} label="Golden Retriever Mix" />
                            <FormControlLabel key={5} value={5} control={<Radio required={true}/>} label="Poodle/Poodle Mix" />
                            <FormControlLabel key={6} value={6} control={<Radio required={true}/>} label="Collie" />
                            <FormControlLabel key={7} value={7} control={<Radio required={true}/>} label="I don't know" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

                <Grid>
                    <TextField
                        required={true}
                        id="dog_location"
                        name="dog_location"
                        label="Dog's City"
                        type="text"
                        value={formValues.dog_location}
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