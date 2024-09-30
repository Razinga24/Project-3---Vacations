import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import VacationModel from "../2-models/vacation-model";
import dal from "../4-utils/dal";
import fileHandler from "../4-utils/file-handler"
import appConfig from "../4-utils/app-config";


async function getVacations(): Promise<VacationModel[]> {
    const sql = `SELECT 
                        vacations.vacationId,
                        vacations.destination,
                        vacations.description, 
                        DATE_FORMAT(vacations.startDate, '%Y-%m-%d') AS startDate, 
                        DATE_FORMAT(vacations.endDate, '%Y-%m-%d') AS endDate, 
                        vacations.price, 
                        vacations.imageName, 
                        CONCAT('${appConfig.imagesUrl}', vacations.imageName) AS imageUrl,  
                        EXISTS(SELECT * FROM followers WHERE followers.vacationId = vacations.vacationId) AS isFollowing,
                        COUNT(followers.userId) AS followersCount
                    FROM vacations
                    LEFT JOIN followers ON vacations.vacationId = followers.vacationId
                    GROUP BY vacations.vacationId
                    ORDER BY vacations.startDate ASC`;
    const vacations = await dal.execute(sql);

    return vacations;
}


async function getAllVacationsByUserId(userId: number): Promise<VacationModel[]> {
    if (!userId || isNaN(userId)) {
        throw new Error("Invalid user ID");
    }

    const sql = `SELECT 
                    vacations.vacationId,
                    vacations.destination,
                    vacations.description, 
                    DATE_FORMAT(vacations.startDate, '%Y-%m-%d') AS startDate, 
                    DATE_FORMAT(vacations.endDate, '%Y-%m-%d') AS endDate, 
                    vacations.price, 
                    vacations.imageName, 
                    CONCAT('${appConfig.imagesUrl}', vacations.imageName) AS imageUrl,
                    EXISTS(SELECT * FROM followers WHERE followers.vacationId = vacations.vacationId AND followers.userId = ? ) AS isFollowing,
                    COUNT(followers.userId) AS followersCount
                FROM vacations
                LEFT JOIN followers ON vacations.vacationId = followers.vacationId
                GROUP BY vacations.vacationId
                HAVING isFollowing = 1
                ORDER BY vacations.startDate ASC;`;
    
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
}



async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT 
                vacationId,
                destination,
                description, 
                DATE_FORMAT(startDate,'%Y-%m-%d') AS startDate, 
                DATE_FORMAT(endDate,'%Y-%m-%d') AS endDate, 
                price, 
                imageName, 
                CONCAT('${appConfig.imagesUrl}', imageName) AS imageUrl  
                FROM vacations
                WHERE vacationId  = ?`;

    const vacations = await dal.execute(sql, [vacationId]);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(vacationId);

    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validate();

    let imageName = null;

    if (vacation.image) {
        imageName = await fileHandler.saveImage(vacation.image);
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ? )`;
    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate,
    vacation.endDate, vacation.price, imageName]);
    vacation.vacationId = result.insertId;
    delete vacation.image;

    return vacation;
};

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validate();

    let imageName = await getVacationImageName(vacation.vacationId);

    if (vacation.image) {
        imageName = await fileHandler.updateImage(vacation.image, imageName);
        vacation.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `UPDATE vacations SET  
                    destination = ?,
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = ?
                    WHERE vacationId = ?`;

    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.startDate,
    vacation.endDate, vacation.price, imageName, vacation.vacationId]);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);
    delete vacation.image;

    return vacation;
};


async function deleteVacation(vacationId: number): Promise<void> {
    const imageName = await getVacationImageName(vacationId);

    const sql = `DELETE FROM vacations WHERE vacationId = ? `;
    const result: OkPacket = await dal.execute(sql, [vacationId]);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

    await fileHandler.deleteImage(imageName);
};

async function getVacationImageName(id: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(id);
    const imageName = vacation.imageName;

    return imageName;
}

export default {
    getVacations,
    getAllVacationsByUserId,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
}