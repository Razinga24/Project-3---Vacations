import express, { Request, Response, NextFunction } from "express";
import followService from "../5-services/follow-service";
import FollowerModel from "../2-models/follower-model";
import cyber from "../4-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-logged-in";

const router = express.Router();

router.post("/:userId([0-9]+)/:vacationId([0-9]+)", async(request:Request, response:Response, next:NextFunction) => {
    try{
        const user = await cyber.verifyToken(request);
        const userId = user.userId; 
        const vacationId = +request.params.vacationId;
        const follow = new FollowerModel(userId,vacationId)
        const addedFollow = await followService.addFollow(userId, vacationId);
        response.status(201).json( addedFollow );
    }catch(err:any){
        next(err);
}})

router.delete("/:userId([0-9]+)/:vacationId([0-9]+)",verifyLoggedIn, async (request: Request, response: Response, next:NextFunction  ) => {
    try{
        const user = await cyber.verifyToken(request);
        const userId = user.userId; 
        const vacationId = +request.params.vacationId;
        await followService.deleteFollow(userId, vacationId);
        response.sendStatus(204);
    }catch(err:any){
        next(err);
    }
});


router.get("/:userId([0-9]+)/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await cyber.verifyToken(request);
        const userId = user.userId; 
        const vacationId = +request.params.vacationId;
        const isFollowing = await followService.isUserFollowing(userId, vacationId);
        response.json(isFollowing);
    } catch (error: any) {
        next(error);
    }
});


export default router;
