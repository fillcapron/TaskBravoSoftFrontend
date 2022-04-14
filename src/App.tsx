import './App.css';
import { Form } from './components/form';
import { Header } from './components/header';
import { Main } from './components/main';
import Container from '@mui/material/Container';
import { useAppSelector } from './hooks/redux';

function App() {
  
  const token = useAppSelector(token => token.authSlice.token);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 10 }}>
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
