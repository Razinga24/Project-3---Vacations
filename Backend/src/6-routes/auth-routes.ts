import express, { Request, Response, NextFunction } from "express";
import authService from "../5-services/auth-service";
import CredentialsModel from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";

const router = express.Router();

router.post("/register", async (request: Request, response: Response, next:NextFunction ) =>{
    try {
        const user = new UserModel(request.body);
        const token = await authService.register(user);
        response.status(201).json(token);
    } catch (error:any) {
        next(error)
    }
});

router.post("/login", async (request: Request, response: Response, next:NextFunction ) =>{
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    } catch (error:any) {
        next(error)
    }
});

export default router;
