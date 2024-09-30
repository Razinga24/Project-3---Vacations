import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel; 

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    public static ValidationSchema = Joi.object({
        userId: Joi.number().positive().integer().optional(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(50),
        email: Joi.string().required().min(10).max(100).pattern(/^[\w.]+@[\w.-]+[.][a-zA-Z]{2,}$/),
        password: Joi.string().required().min(3).max(50),
        roleId: Joi.optional()
    });

    public validate(): void {
        const result = UserModel.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default UserModel;
