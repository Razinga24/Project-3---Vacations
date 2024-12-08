import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import vacationsReducer from './VacationsSlice';
import followersReducer from "./followersSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacations: vacationsReducer,
        followers: followersReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});

export type RootState = ReturnType<typeof store.getState>;
