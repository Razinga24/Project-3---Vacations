import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public imageUrl: string;
    public image: UploadedFile;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    public static ValidationSchema = Joi.object({
        vacationId: Joi.number().positive().integer().optional(),
        destination: Joi.string().required().trim().min(2).max(50),
        description: Joi.string().required().min(2).max(600),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().greater(Joi.ref('startDate')),
        price: Joi.number().required().positive().max(10000),
        imageUrl: Joi.optional(),
        image: Joi.optional(),
    });

    public validate(): void {
        const result = VacationModel.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}

export default VacationModel; 