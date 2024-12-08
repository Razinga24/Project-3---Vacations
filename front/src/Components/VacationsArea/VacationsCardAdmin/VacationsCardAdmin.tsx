import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Stack, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import AirlinesIcon from '@mui/icons-material/Airlines';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { blue } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import "./VacationsCardAdmin.css";


interface VacationCardAdminProps {
    vacation: VacationModel;
    delVacation: (id: number) => void;
}

export default function VacationCardAdmin(props: VacationCardAdminProps) {

    const { vacation, delVacation } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function formatDateWithLeadingZeros(dateString: string): string {
        const date = new Date(dateString);
        return format(date, 'dd.MM.yyyy');
    }

    return (
        <Card sx={{ width: 500 }} className="VacationCardAdmin" component={Paper} elevation={18}>

            <div>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: blue[900] }} aria-label="recipe">
                            <AirlinesIcon />
                        </Avatar>
                    }
                    title={vacation.destination.toUpperCase()}
                />

                <CardContent className="">

                    <Stack direction="row" spacing={1}>

                        <Link to={"/vacations/edit/" + vacation?.vacationId}> <Button size="small" variant="contained" endIcon={<EditIcon />}>Edit</Button></Link>

                        <Button onClick={handleClickOpen} type="submit" size="small" variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Confirm Deletion"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this vacation? This action cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => delVacation(vacation.vacationId)} autoFocus >Agree</Button>
                            </DialogActions>
                        </Dialog>

                    </Stack>

                </CardContent>

                <CardMedia
                    component="img"
                    height="250"
                    image={vacation.imageUrl}
                    alt={vacation.destination}
                />

                <CardContent className='date'>

                    <Typography variant="body1" color="black" >

                        <CalendarMonthIcon />
                        {formatDateWithLeadingZeros(vacation.startDate)} - {formatDateWithLeadingZeros(vacation.endDate)}

                    </Typography>

                </CardContent>

                <CardContent>

                    <Typography variant="body2" color="text.secondary" className="textWrap">
                        {vacation.description}
                    </Typography>

                </CardContent>

            </div>

            <CardContent className='CardBtn'>

                <Typography variant="body2" color="text.secondary" >
                    <Button variant="contained">${vacation.price}</Button>
                </Typography>

            </CardContent>

        </Card >
    );
}
