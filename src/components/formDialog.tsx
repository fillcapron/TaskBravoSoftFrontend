import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Employee } from '../store/model';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addEmployeer, updateEmployeer } from '../store/reducers/actionCreator';

interface FormDialogProps {
    type: string,
    value?: Employee
}

export const FormDialog: React.FC<FormDialogProps> = ({ type, value }) => {
    const token = useAppSelector(token => token.authSlice.token);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const { handleSubmit, control, reset } = useForm<Employee>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickEdit = () => {
        setOpen(true);
        if (value) {
            reset(value);
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<Employee> = (data) => {
        if (type === "add") {
            dispatch(addEmployeer(data, token));
        }
        if (type === "read") {
            dispatch(updateEmployeer(token, data));
        }
        setOpen(false);
    }

    return (
        <div>
            {
                !value ?
                    <Button variant="contained" sx={{ mb: 1 }} onClick={handleClickOpen}>
                        Добавить сотрудника
                    </Button>
                    : <Button disabled={value ? false : true} variant="contained" sx={{ mb: 1, ml: 1 }} onClick={handleClickEdit}>Изменить</Button>
            }
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Введите данные</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} mb={2}>
                            <Controller
                                control={control}
                                name="fio"
                                render={({ field }) => (
                                    <TextField
                                        id="standard-basic"
                                        label="ФИО"
                                        variant="outlined"
                                        size='small'
                                        margin='normal'
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value || ''}
                                        required={true}
                                    />
                                )
                                }
                            />
                            <Controller
                                control={control}
                                name="timesheet_id"
                                render={({ field }) => (
                                    <TextField
                                        id="standard-basic"
                                        label="Табельный номер"
                                        variant="outlined"
                                        size='small'
                                        margin='normal'
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value || ''}
                                        required={true}
                                    />
                                )
                                }
                            />
                            <Controller
                                control={control}
                                name="position"
                                render={({ field }) => (
                                    <TextField
                                        id="standard-basic"
                                        label="Должность"
                                        variant="outlined"
                                        size='small'
                                        margin='normal'
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value || ''}
                                        required={true}
                                    />
                                )
                                }
                            />
                            <Controller
                                control={control}
                                name="date_employment"
                                render={({ field }) => (
                                    <TextField
                                        id="standard-basic"
                                        label="Дата трудоустройства"
                                        variant="outlined"
                                        size='small'
                                        margin='normal'
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value ? new Date(field.value).toLocaleDateString('ru-RU') : ''}
                                        required={true}
                                    />
                                )
                                }
                            />
                            <Controller
                                control={control}
                                name="birth"
                                render={({ field }) => (
                                    
                                    <TextField
                                        id="standard-basic"
                                        label="Дата рождения"
                                        variant="outlined"
                                        size='small'
                                        margin='normal'
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value ? new Date(field.value).toLocaleDateString('ru-RU') : ''}
                                        required={true}
                                    />
                                )
                                }
                            />
                            <Controller
                                control={control}
                                name="age"
                                render={({ field }) => (
                                    <TextField
                                        id="standard-basic"
                                        label="Полных лет"
                                        variant="outlined"
                                        size='small'
                                        margin='normal'
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value || ''}
                                    />
                                )
                                }
                            />
                            <Controller
                                control={control}
                                name="note"
                                render={({ field }) => (
                                    <TextField
                                        id="standard-basic"
                                        label="Примечание"
                                        variant="outlined"
                                        size='small'
                                        margin='normal'
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value || ''}
                                    />
                                )
                                }
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error" variant="contained">Отмена</Button>
                        <Button type="submit" color="success" variant="contained">{type === 'add' ? 'Добавить' : 'Обновить'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}