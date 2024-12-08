import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import VacationModel from "../Models/VacationModel";

interface VacationState {

    vacationsList: VacationModel[];
}

const initialState: VacationState = {
    vacationsList: [],
}

const vacationsSlice = createSlice({
    name: "vacations",   // Name of the slice
    initialState,       // initialState object
    reducers: {         // list of reducers functions

        getVacations: (state, action: PayloadAction<VacationModel[]>) => {
            state.vacationsList = action.payload;
        },

        addVacation: (state, action: PayloadAction<VacationModel>) => {
            state.vacationsList.push(action.payload);
        },

        updateVacation: (state, action: PayloadAction<VacationModel>) => {

            const updatedVacation = { ...action.payload };
            state.vacationsList = state.vacationsList.filter(v => v.vacationId !== action.payload.vacationId).concat(updatedVacation);
        },

        deleteVacation: (state, action: PayloadAction<number>) => {

            state.vacationsList = state.vacationsList.filter(v => v.vacationId !== action.payload);
        }
    }
})

export const { getVacations, addVacation, updateVacation, deleteVacation } = vacationsSlice.actions;
export default vacationsSlice.reducer;