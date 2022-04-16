import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { escapeRegExp, getAge, getDate } from '../utils';
import { Employee } from '../store/model';
import { useEffect, useState } from 'react';
import { FormDialog } from './formDialog';
import { SearchToolbar } from './searchToolbar';
import { Box, Button } from '@mui/material';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    {
        field: 'fio',
        headerName: 'ФИО',
        headerAlign: 'center',
        width: 200,
        type: 'string'
    },
    {
        field: 'timesheet_id',
        headerName: 'Табельный номер',
        width: 150,
        type: 'number'
    },
    {
        field: 'position',
        headerName: 'Должность',
        type: 'string',
        editable: false,
        width: 110,
    },
    {
        field: 'date_employment',
        headerName: 'Дата трудоустройства',
        width: 170,
        type: 'date',
        valueGetter: getDate,
    },
    {
        field: 'birth',
        headerName: 'Дата рождения',
        width: 130,
        type: 'date',
        valueGetter: getDate,
    },
    {
        field: 'age',
        headerName: 'Полных лет',
        width: 100,
        type: 'number',
        valueGetter: getAge,
    },
    {
        field: 'note',
        headerName: 'Примечания',
        width: 170,
        type: 'string',
        headerAlign: 'center',
    },
];

interface IPropsDataTable {
    employee: Employee[],
    deleteEmployee: (ids: number[]) => void
}


export const DataTable: React.FC<IPropsDataTable> = ({ employee, deleteEmployee }) => {

    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<Employee[]>(employee);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    useEffect(() => {
        setRows(employee);
    }, [employee]);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = employee.filter((row: any) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field]?.toString());
            });
        });
        setRows(filteredRows);
    };

    const getRowData = (id: number) => {
        return rows.find((row) => row.id === id);
    }

    return (
        <div style={{ height: 600, width: '100%' }}>
            <Typography variant='h4' component="div" mb={2} sx={{ textAlign: 'center' }}>
                Данные по сотрудникам
            </Typography>
            {
                selectionModel.length ?
                    <Box sx={{ display: 'flex' }}>
                        <Button variant="contained" color="error" onClick={() => deleteEmployee(selectionModel as number[])} sx={{ mb: 1 }}>Удалить</Button>
                        <FormDialog type='read' value={getRowData(selectionModel[0] as number)} />
                    </Box>
                    : <FormDialog type='add' />
            }

            <DataGrid
                components={{ Toolbar: SearchToolbar }}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                disableColumnMenu
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                            requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
                onSelectionModelChange={(ids) => setSelectionModel(ids)}
            />
        </div>
    )
}