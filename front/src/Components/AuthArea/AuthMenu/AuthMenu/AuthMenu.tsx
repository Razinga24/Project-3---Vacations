import React from 'react';
import { Typography } from '@mui/material';
import './AuthMenu.css';
import useVerifyLoggedIn from '../../../../Hooks/useVerifyLoggedIn';
import authService from '../../../../Services/AuthService';
import notifyService from '../../../../Services/NotifyService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { NavLink } from 'react-router-dom';

function AuthMenu(): JSX.Element {

    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    const logoutUser = () => {
        authService.logout();
        notifyService.success(`Bye ${user.firstName}, See You Later...`);
        navigate('/home');
    };

    return (
        <div className="AuthMenu">
            {
                !user && <>
                    <span>Hello Guest </span> |
                    <NavLink to="/login"> Login</NavLink> |
                    <NavLink to="/register"> Register</NavLink>
                </>
            }
            {
                user && <>
                    <span>Hello, {user.firstName} {user.lastName}</span> |
                    <span onClick={logoutUser} className="link"> Logout</span>
                </>
            }
        </div>
    );
}

export default AuthMenu;
