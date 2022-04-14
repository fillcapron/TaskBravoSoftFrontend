import React from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { User } from '../store/model';
import { useAppDispatch } from '../hooks/redux';
import { login } from '../store/reducers/actionCreator';

export const Form: React.FC = () => {
    const dispatch = useAppDispatch();
    const { handleSubmit, control } = useForm<User>();

    const onSubmit: SubmitHandler<User> = ({ email, password }) => {
        if (email && password) {
            dispatch(login(email, password));
        }
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Typography variant='h4' component="div">
                Войдите
            </Typography>
            <Typography variant='subtitle1' component="div">
                Чтобы отобразить таблицу c данными
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} mb={2}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextField
                                id="standard-basic"
                                label="Email"
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
                        name="password"
                        render={({ field }): any => (
                            <TextField
                                id="standard-basic"
                                label="Пароль"
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
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                >Войти</Button>
            </form>

        </div>
    )
}

