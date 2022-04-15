import './App.css';
import { Form } from './components/loginForm';
import { Header } from './components/header';
import { Main } from './components/main';
import Container from '@mui/material/Container';
import { useAppSelector } from './hooks/redux';

function App() {
  
  const token = useAppSelector(token => token.authSlice.token);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {
          token ?
          <Main/>
          : <Form />
        }
      </Container>
    </>
  );
}

export default App;
