import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel{
    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    public static ValidationSchema = Joi.object({
        email: Joi.string().required().min(10).max(100).pattern(/^[\w.]+@[\w.-]+[.][a-zA-Z]{2,}$/),
        password: Joi.string().required().min(3).max(255)
    });

    public validate(): void {
        const result = CredentialsModel.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;