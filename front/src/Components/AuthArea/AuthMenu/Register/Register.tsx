import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import AirlinesIcon from '@mui/icons-material/Airlines';
import { useForm } from 'react-hook-form';
import UserModel from '../../../../Models/UserModel';
import authService from '../../../../Services/AuthService';
import notifyService from '../../../../Services/NotifyService';
import useTitle from '../../../../Hooks/useTitle';
import './Register.css';

function Register(): JSX.Element {
    const navigate = useNavigate();
    useTitle('Register');

    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    const save = async (user: UserModel) => {
        try {
            await authService.register(user);
            notifyService.success('Thanks for joining us!');
            navigate('/vacations');
        } catch (error: any) {
            notifyService.error(error.message);
        }
    };

    return (
        <Grid container component="main" className="Register">
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
                    <Typography component="h1" variant="h5" >
                    Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(save)} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            {...register('firstName', { required: 'First Name is required' })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            {...register('lastName', { required: 'Last Name is required' })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            {...register('email', { required: 'Email is required' })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Register;
