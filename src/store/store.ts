import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import employeeSlice from "./reducers/employeeSlice";

const rootReducers = combineReducers({
    authSlice,
    employeeSlice
})

export const initStore = () => {
    return configureStore({
        reducer: rootReducers,
    })
}

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof initStore>;
export type AppDispatch = AppStore['dispatch'];