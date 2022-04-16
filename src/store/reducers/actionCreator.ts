import { AppDispatch } from "../store";
import { authFetching, authFetchingError, authFetchingSuccess } from "./authSlice";
import axios from "axios";
import { employeeFetching, addEmployee, deleteEmployee, updateEmployee, employeeFetchingError, employeeFetchingSuccess } from "./employeeSlice";
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

export const addEmployeer = (data: Employee, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(employeeFetching())
        const res = await axios.post<any, any>('http://localhost:5000/employee', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch(addEmployee(res.data));
    } catch (e) {
        dispatch(employeeFetchingError('Ошибка создания сотрудника'));
    }
}

export const deleteEmployees = (token: string, data: number[]) => async (dispatch: AppDispatch) => {
    try {
        dispatch(employeeFetching())
        await axios.post<any, any>('http://localhost:5000/employee/delete', { ids: data }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch(deleteEmployee(data));
    } catch (e) {
        dispatch(employeeFetchingError('Ошибка удаления сотрудника'));
    }
}

export const updateEmployeer = (token: string, data: Employee) => async (dispatch: AppDispatch) => {

    const {id, fio, timesheet_id, position, date_employment, birth, age, note} = data;

    try {
        dispatch(employeeFetching())
        await axios.patch<any, any>('http://localhost:5000/employee', {id, fio, timesheet_id, position, date_employment: new Date(date_employment!), birth: new Date(birth!), age, note}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch(updateEmployee(data));
    } catch (e) {
        dispatch(employeeFetchingError('Ошибка удаления сотрудника'));
    }
} 