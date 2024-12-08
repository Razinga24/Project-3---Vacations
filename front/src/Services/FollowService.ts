import axios from "axios";
import appConfig from "../Utils/Config";
import FollowerModel from "../Models/FollowerModel";
import { store } from "../Redux/Store";
import { addFollow, deleteFollow } from "../Redux/followersSlice";

class FollowersService {

    public async addFollow(follower: FollowerModel): Promise<void> {

        const response = await axios.post<FollowerModel>(appConfig.followsUrl + follower.userId + "/" + follower.vacationId, follower);
        
        const addedFollower = response.data;
        store.dispatch(addFollow(addedFollower));
    }


    public async deleteFollow(follower: FollowerModel): Promise<void> {
        await axios.delete<void>(appConfig.followsUrl + follower.userId + '/' + follower.vacationId);
        store.dispatch(deleteFollow(follower));
    }

    public async isUserFollowing(userId: number, vacationId: number): Promise<boolean> {

        const response = await axios.get<boolean>(appConfig.followsUrl + userId + '/' + vacationId);
        return response.data;

    }

}

const followersService = new FollowersService();
export default followersService;
