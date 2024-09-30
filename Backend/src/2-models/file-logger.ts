import { NextFunction, Request, Response } from "express";
import logger from "../4-utils/logger";


async function fileLogger( request: Request, response: Response, next: NextFunction ){
    try{

        await logger.activityLogger(`Method: ${request.method}, Route: ${request.originalUrl}`);
        next();

    }catch(err:any){
        next(err);
    }
}

export default fileLogger;