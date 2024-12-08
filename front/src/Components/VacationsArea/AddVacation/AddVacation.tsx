import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, CssBaseline, Grid, TextField, Typography, Paper, FormHelperText } from "@mui/material";
import AirlinesIcon from '@mui/icons-material/Airlines';
import { Link } from "react-router-dom";
import "./AddVacation.css";


function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();

    const add = async (vacation: VacationModel) => {

        try {

            if (new Date(vacation.startDate) > new Date(vacation.endDate)) {

                return notifyService.error("The Check In date must be earlier than the Check Out date!");
            }

            await vacationService.AddVacation(vacation);
            notifyService.success("Vacation has been successfully added");
            navigate("/vacations-admin");

        } catch (error: any) {
            notifyService.error(error);;
        }
    }

    return (

        <Grid container component="main" className="AddVacation">
            <CssBaseline />

            <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square borderRadius={'1rem'} >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#1d3557' }}>
                        <AirlinesIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Vacation
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(add)} sx={{ mt: 1 }}>

                        <div className="form-control" >
                            <TextField {...register("destination", VacationModel.destinationValidation)}
                                margin="normal"
                                required
                                fullWidth
                                id="destination"
                                label="Destination"
                                name="destination"
                                autoComplete="destination"
                                inputProps={{ message: formState.errors.destination?.message }}
                            />
                            <FormHelperText>
                                {formState.errors.destination?.message}
                            </FormHelperText>
                        </div>

                        <div className="form-control" >
                            <TextField {...register("description", VacationModel.descriptionValidation)}
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                multiline
                                rows={5}

                            />
                            <FormHelperText>{formState.errors.description?.message}</FormHelperText>
                        </div>


                        <div className="form-control" >
                            <TextField {...register("startDate", VacationModel.startDateValidation)}
                                margin="normal"
                                required
                                fullWidth
                                id="startDate"
                                label="Start Date"
                                name="startDate"
                                autoComplete="startDate"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormHelperText>{formState.errors.startDate?.message}</FormHelperText>
                        </div>


                        <div className="form-control" >
                            <TextField  {...register("endDate", VacationModel.endDateValidation)}
                                margin="normal"
                                required
                                fullWidth
                                id="endDate"
                                label="End Date"
                                name="endDate"
                                autoComplete="endDate"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormHelperText>{formState.errors.endDate?.message}</FormHelperText>
                        </div>

                        <div className="form-control" >
                            <TextField  {...register("price", VacationModel.priceValidation)}
                                margin="normal"
                                required
                                fullWidth
                                name="price"
                                label="price"
                                type="number"
                                id="price"
                                autoComplete="price"
                            />
                            <FormHelperText>{formState.errors.price?.message}</FormHelperText>
                        </div>

                        <div className="form-control" >
                            <TextField {...register("image", VacationModel.imageValidation)}
                                margin="normal"
                                required
                                fullWidth
                                name="image"
                                label="image"
                                type="file"
                                id="image"
                                autoComplete="image"
                                InputLabelProps={{ shrink: true, }}
                                inputProps={{ accept: "image/*" }}
                            />
                            <FormHelperText>{formState.errors.image?.message}</FormHelperText>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add
                        </Button>

                        <Link to={"/vacations-admin"}>
                            Cancel
                        </Link>

                    </Box>
                </Box>
            </Grid>
        </Grid>


    );
}

export default AddVacation;





