import Joi from "joi";
import { ValidationError } from "./client-errors";

class FollowerModel{

    public constructor(public userId:number, public vacationId:number){}

    public static ValidationSchema = Joi.object({
        userId: Joi.number().integer().positive().required(),
        vacationId: Joi.number().integer().positive().required()
    });

    public validate():void {
        const result = FollowerModel.ValidationSchema.validate(this);
        if( result.error ) throw new ValidationError( result.error.message );
    }
}

export default FollowerModel;
