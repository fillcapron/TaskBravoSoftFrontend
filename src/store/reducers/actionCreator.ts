import { AppDispatch } from "../store";
import { authFetching, authFetchingError, authFetchingSuccess } from "./authSlice";
import axios from "axios";
import { employeeFetching, employeeFetchingError, employeeFetchingSuccess } from "./employeeSlice";
import { Employee } from "../model";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching());
        const res = await axios.post<any, any>('http://localhost:5000/auth/login', {
            email,
            password
        });
        dispatch(authFetchingSuccess(res.data.token));
    } catch (e) {
        dispatch(authFetchingError('Ошибка авторизации'));
    }
}

export const getEmployee = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(employeeFetching())
        const res = await axios.get<Employee[]>('http://localhost:5000/employee', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch(employeeFetchingSuccess(res.data))
    } catch (e) {
        dispatch(employeeFetchingError('Ошибка получения сотрудников'));
    }
}