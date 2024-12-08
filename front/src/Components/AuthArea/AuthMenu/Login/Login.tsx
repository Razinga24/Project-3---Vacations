import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Paper, Link, Box, Button, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { useForm } from 'react-hook-form';
import CredentialsModel from '../../../../Models/CredentialsModel';
import AirlinesIcon from '@mui/icons-material/Airlines';
import authService from '../../../../Services/AuthService';
import notifyService from '../../../../Services/NotifyService';
import useTitle from '../../../../Hooks/useTitle';
import './Login.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import RoleModel from '../../../../Models/RoleModel';


const defaultTheme = createTheme();

function Login(): JSX.Element {
    
    const navigate = useNavigate();
    useTitle('Login');

    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();

    const user = useSelector((state: RootState) => state.auth.user);

    const save = async (credentials: CredentialsModel) => {
        try {
            await authService.login(credentials);
            notifyService.success('Welcome Back...');
        } catch (error: any) {
            notifyService.error(error.message);
        }
    };

    useEffect(() => {

        if (user?.roleId === RoleModel.User) {
            navigate("/vacations");
        } else if (user?.roleId === RoleModel.Admin) {
            navigate("/vacations-admin");
        }
    }, [user]);

    return (
        <ThemeProvider theme={defaultTheme} >
            <Grid container component="main" sx={{ height: '100%', width: '95%', margin: 'auto' }} className="loginContainer">
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={1}
                    md={4}
                    
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='Login'>
                        <Avatar sx={{ m: 1, bgcolor: '#1d3557' }}>
                            <AirlinesIcon />
                        </Avatar>
                    <Typography component="h1" variant="h5" align="center">
                        Sign In
                    </Typography>
                    <br />
                    <Box >
                    <Box component="form" noValidate onSubmit={handleSubmit(save)} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            sx={{ mb: 2, ml:14, width: 450}}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            {...register('email', { required: 'Email is required' })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <br />
                        <TextField
                            margin="normal"
                            required
                            sx={{ mb: 2, ml:14, width: 450}}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button
                            type="submit"
                            size='large'
                            variant="contained"
                            color="primary"
                            sx={{ mt: 8, mb: 2, ml:14, width: 450}}
                        >
                            Sign In
                        </Button>

                        <Grid container sx={{  mb: 2, ml:14, width: 450}}>
                            <Grid item>
                                    <Link href="register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                            </Grid>
                        </Grid>

                        </Box>
                    </Box>
                </Grid> 
            </Grid>
        </ThemeProvider>
    );
}

export default Login;
