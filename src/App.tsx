import './App.css';
import { Form } from './components/loginForm';
import { Header } from './components/header';
import { Main } from './components/main';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useAppSelector } from './hooks/redux';

function App() {

  const { token, error } = useAppSelector(token => token.authSlice);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {
          error ?
            <Alert severity="error" sx={{mb: 2, justifyContent: 'center'}}>
              <AlertTitle>{error}</AlertTitle>
              Проверьте введенные данные
            </Alert> : ''
        }
        {
          token ?
            <Main />
            : <Form />
        }
      </Container>
    </>
  );
}

export default App;
