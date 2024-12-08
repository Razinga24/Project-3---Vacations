import axios from "axios";
import appConfig from "../Utils/Config";
import VacationModel from "../Models/VacationModel";
import { store } from "../Redux/Store";
import { addVacation, deleteVacation, getVacations, updateVacation } from "../Redux/VacationsSlice";

class VacationsService {

    // Get all Vacations
    public async getAllVacations(): Promise<VacationModel[]> {

        let vacations = store.getState().vacations.vacationsList;

        if (!vacations.length) {

            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;
            store.dispatch(getVacations(vacations));
        }

        const sortedVacations = [...vacations].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.endDate).getTime());

        return sortedVacations;
    }


    // Get all Vacations by userId
    public async getAllVacationsByUserId(userId: number): Promise<VacationModel[]> {

        const response = await axios.get<VacationModel[]>(appConfig.vacationsByUserUrl + userId);
        console.log(response);
        
        const vacations = response.data;
        return vacations;
    }


    // Get one Vacation
    public async getOneVacation(id: number): Promise<VacationModel> {

        let vacations = store.getState().vacations.vacationsList;
        
        let vacation = vacations.find(v => v.vacationId === id);
        
        
        if (!vacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
            vacation = response.data;
        }
        return vacation;
    }


    // Add Vacation
    public async AddVacation(vacation: VacationModel): Promise<void> {

        const myData = new FormData();
        myData.append("destination", vacation.destination);
        myData.append("description", vacation.description);
        myData.append("startDate", vacation.startDate);
        myData.append("endDate", vacation.endDate);
        myData.append("price", vacation.price.toString());
        myData.append("image", vacation.image[0]);

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myData);

        const addedVacation = response.data;

        store.dispatch(addVacation(addedVacation));
    }

    // Update vacation:
    public async updateVacation(vacation: VacationModel): Promise<void> {

        const myData = new FormData();
        myData.append("destination", vacation.destination);
        myData.append("description", vacation.description);
        myData.append("startDate", vacation.startDate);
        myData.append("endDate", vacation.endDate);
        myData.append("price", vacation.price.toString());
        myData.append("image", vacation.image[0]);

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, myData);
        const updatedVacation = response.data;

        store.dispatch(updateVacation(updatedVacation));
    }

    public async deleteVacation(vacationId: number): Promise<void> {

        await axios.delete<void>(appConfig.vacationsUrl + vacationId);
        store.dispatch(deleteVacation(vacationId));
    }

}
const vacationService = new VacationsService();
export default vacationService;