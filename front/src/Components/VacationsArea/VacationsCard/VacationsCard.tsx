
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography, Paper } from '@mui/material';
import { blue } from '@mui/material/colors';
import AirlinesIcon from '@mui/icons-material/Airlines';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns';
import notifyService from '../../../Services/NotifyService';
import VacationModel from '../../../Models/VacationModel';
import { RootState } from '../../../Redux/Store';
import './VacationsCard.css';
import followersService from '../../../Services/FollowService';

interface VacationCardProps {
    vacation: VacationModel;
}

export default function VacationCard(props: VacationCardProps) {

    const { vacation } = props;

    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?.userId;

    const vacationId = vacation.vacationId;
    

    const [liked, setLiked] = useState<boolean>(props.vacation.isFollowing);
    const [followersCount, setFollowersCount] = useState<number>(vacation.followersCount);

    useEffect(() => {

        const fetchData = async () => {
            if (userId) {
                try {
                    const isFollowing = await followersService.isUserFollowing(userId, vacationId);
                    setLiked(isFollowing);
                } catch (error) {
                    notifyService.error(error);
                }
            }
        };

        fetchData();
    }, [userId, vacationId]);


    const handleLikeToggle = async () => {

        try {
            if (liked) {
                await followersService.deleteFollow({ userId, vacationId });
                setFollowersCount(followersCount - 1);
            } else {
                await followersService.addFollow({ userId, vacationId });
                setFollowersCount(followersCount + 1);
            }
            setLiked((prevLiked) => !prevLiked);
        } catch (error) {
            notifyService.error(error);
        }
    };

    function formatDateWithLeadingZeros(dateString: string): string {
        const date = new Date(dateString);
        return format(date, 'dd.MM.yyyy');
    }

    return (
        <Card className="VacationCard" component={Paper} elevation={18}>
            <div>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: blue[900] }} aria-label="recipe">
                            <AirlinesIcon />
                        </Avatar>
                    }
                    title={vacation.destination.toUpperCase()}
                />

                <CardMedia component="img" height="250" image={vacation.imageUrl} alt={vacation.destination} />

                <CardContent className="like">
                    <Typography variant="body1" color="black">
                        <CalendarMonthIcon /> {formatDateWithLeadingZeros(vacation.startDate)} - {formatDateWithLeadingZeros(vacation.endDate)}
                    </Typography>
                    <Typography variant="body1" color="black">
                        <IconButton aria-label="add to favorites" onClick={handleLikeToggle} >
                            <FavoriteIcon color={liked ? 'error' : 'action'} />
                        </IconButton>
                        Like {followersCount}
                    </Typography>
                </CardContent>

                <CardContent>
                    <Typography variant="body2" color="text.secondary" className="textWrap">
                        {vacation.description}
                    </Typography>
                </CardContent>
            </div>

            <CardContent className="CardBtn">
                <Typography variant="body2" color="text.secondary">
                    <Button variant="contained">${vacation.price}</Button>
                </Typography>
            </CardContent>
        </Card>
    );
}
