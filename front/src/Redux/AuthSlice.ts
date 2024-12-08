import { jwtDecode } from "jwt-decode";
import UserModel from "../Models/UserModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


// 1. interface:
interface AuthState {
    token: string;
    user: UserModel;
}


// 2. initial object:
const initialState: AuthState = {
    token: localStorage.getItem("token"),
    user: null
}


if (initialState.token) {
    const container: { user: UserModel } = jwtDecode(initialState.token);
    initialState.user = container.user;
}

// 3. create Slice:
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        register: (state, action: PayloadAction<string>) => {

            // Decode the token:
            const container: { user: UserModel } = jwtDecode(action.payload);

            // Save to storage:
            localStorage.setItem("token", action.payload);

            // Update to state:
            state.token = action.payload;
            state.user = container.user;
        },

        login: (state, action: PayloadAction<string>) => {

            const container: { user: UserModel } = jwtDecode(action.payload);
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
            state.user = container.user;
        },

        logout: (state) => {

            state.token = null;
            state.user = null;
            localStorage.removeItem("token");

        }
    }
});



// 4. exports:
export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;