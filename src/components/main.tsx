import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { deleteEmployees, getEmployee } from '../store/reducers/actionCreator';
import { DataTable } from './dataTable';


export const Main: React.FC = () => {

    const dispatch = useAppDispatch();
    const token = useAppSelector(token => token.authSlice.token);
    const { employee, error } = useAppSelector(employee => employee.employeeSlice);

    useEffect(() => {
        if (token) dispatch(getEmployee(token));
    }, [dispatch, token]);

    const deleteEmployee = (ids: number[]) => {
        dispatch(deleteEmployees(token, ids));
    }

    return (
        <>
        {
          error ?
            <Alert severity="error" sx={{mb: 2, justifyContent: 'center'}}>
              <AlertTitle>{error}</AlertTitle>
            </Alert> : ''
        }
            {
                employee.length ?
                    <DataTable employee={employee} deleteEmployee={deleteEmployee} />
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <CircularProgress />
                    </Box>
            }
        </>
    )
}