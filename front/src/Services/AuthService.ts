import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/Config";
import CredentialsModel from "../Models/CredentialsModel";
import { login, logout, register } from "../Redux/AuthSlice";
import { store } from "../Redux/Store";
import { jwtDecode } from "jwt-decode";
import { getVacations } from "../Redux/VacationsSlice";

class AuthService {


    // Register:
    public async register(user: UserModel): Promise<void> {

        // AJAX Request:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract Token:
        const token = response.data;

        // Save Token to Gloabl State:
        store.dispatch(register(token));

    }

    // Login:
    public async login(credentials: CredentialsModel): Promise<void> {

        // AJAX Request:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract Token:
        const token = response.data;

        // Save Token to Gloabl State:
        store.dispatch(login(token));

    }

    // Logout:
    public logout(): void {
        store.dispatch(logout());
        store.dispatch(getVacations([]));
    }


    // Extract user id from token
    public getUserIdFromToken(): number | null {
        try {
            const token = store.getState().auth.token;
            const container: { user: UserModel } = jwtDecode(token);
            return container.user.userId;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }


}
const authService = new AuthService();
export default authService;