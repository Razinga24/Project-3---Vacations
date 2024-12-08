import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import RoleModel from '../../../Models/RoleModel';
import "./Header.css";
import { useState } from 'react';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu/AuthMenu';



interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['home', 'vacations'];
const navItemsAdmin = ['home', 'vacations-admin', 'vacations-graph'];

export default function DrawerAppBar(props: Props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const user = useSelector((state: RootState) => state.auth.user);
    const isAdmin = user?.roleId === RoleModel.Admin;

    const navItemsToRender = isAdmin ? navItemsAdmin : navItems;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                TravelTide
            </Typography>
            <Divider />
            <List>
                {navItemsToRender.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>

                            <ListItemText primary={<NavLink className='hamburgerNavbar' to={item}>{item}</NavLink>} />

                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        <Box sx={{ display: 'flex' }} >

            <CssBaseline />

            <AppBar component="nav" className='Header'>

                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <FlightTakeoffIcon />  TravelTide
                    </Typography>


                    {/* ** NAVBAR HOME AND VACATIONS ** */}
                    <Box sx={{ flexGrow: 35, display: { xs: 'none', sm: 'block' } }}>

                        {navItemsToRender.map((item) => (

                            <Button key={item} sx={{ color: '#fff' }}>

                                <NavLink className='navBar' to={item}>{item}</NavLink>

                            </Button>

                        ))}

                    </Box>

                    {/*  ** AUTH MENU ** */}
                    <AuthMenu />

                </Toolbar>

            </AppBar>

            {/* Hamburger Menu*/}
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

