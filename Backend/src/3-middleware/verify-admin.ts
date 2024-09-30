import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";
import { UnauthorizedError } from "../2-models/client-errors";
import RoleModel from "../2-models/role-model";

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        const user = await cyber.verifyToken(request);
        if ( user.roleId !== RoleModel.Admin) {
            throw new UnauthorizedError("You are not Admin");
        }
        next();
    } catch (error: any) {
        next(error);
    }
}

export default verifyAdmin;
