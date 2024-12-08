import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/VacationModel";
import { Link, useNavigate, useParams } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsService";
import { ChangeEvent, useEffect, useState } from "react";
import { format } from 'date-fns';
import { Avatar, Box, Button, CssBaseline, FormHelperText, Grid, TextField, Typography, Paper } from "@mui/material";
import AirlinesIcon from '@mui/icons-material/Airlines';
import "./EditVacation.css";


function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        const { vacationId } = params;
        
        vacationService.getOneVacation(+vacationId)
            .then(v => {
                setValue("vacationId", v.vacationId);
                setValue("destination", v.destination);
                setValue("description", v.description);
                setValue("startDate", format(new Date(v.startDate), 'yyyy-MM-dd'));
                setValue("endDate", format(new Date(v.endDate), 'yyyy-MM-dd'));
                setValue("price", v.price);
                setImageUrl(v.imageUrl);
            })
            .catch(error => notifyService.error(error));

    }, []);

    const update = async (vacation: VacationModel) => {

        try {

            if (new Date(vacation.startDate) > new Date(vacation.endDate)) {

                return notifyService.error("The Check In date must be earlier than the Check Out date!");
            }

            await vacationService.updateVacation(vacation);
            notifyService.success("Vacation has been successfully updated");
            navigate("/vacations-admin");
        } catch (error: any) {
            notifyService.error(error);;
        }
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                setImageUrl(result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };


    return (

        <Grid container component="main" className="EditVacation">
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
                        Edit Vacation
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(update)} sx={{ mt: 1 }}>

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
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                            <FormHelperText>{formState.errors.description?.message}</FormHelperText>
                        </div>


                        <div className="form-control" >
                            <TextField {...register("startDate")}
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormHelperText>{formState.errors.price?.message}</FormHelperText>
                        </div>

                        <div className="form-control" >
                            <TextField {...register("image")} onChange={handleImageChange}
                                margin="normal"
                                fullWidth
                                name="image"
                                label="image"
                                type="file"
                                id="image"
                                autoComplete="image"
                                InputLabelProps={{ shrink: true, }}
                                inputProps={{ accept: "image/*" }}
                                sx={{ backgroundImage: { imageUrl } }}
                            />
                            <FormHelperText>{formState.errors.image?.message}</FormHelperText>
                            {imageUrl && <img src={imageUrl} />}

                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update
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

export default EditVacation;
