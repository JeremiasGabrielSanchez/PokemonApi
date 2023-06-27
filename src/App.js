import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './componentes/NavBar/NavBar.js'
import ListPokemonContainer from './componentes/Container/ListPokemonContainer.js';
import { Login } from './componentes/User/Login.js';
import { SingUp } from './componentes/User/SingUp.js';
import CarrucelHome from './componentes/Container/CarrucelHome.js';
import AuthProvider from './componentes/context/ContextAuth.js';
import UserView from './componentes/Container/UserView.js';

function App() {
  return (
    
    <AuthProvider>

      <BrowserRouter>

        <ChakraProvider>

          <NavBar/>

          <Routes>
            <Route path='/' element={<CarrucelHome/>}/>
            <Route path='/pokemon' element={<ListPokemonContainer/>}/>
            <Route path='/pokemon/:id' element={<ListPokemonContainer/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/singup' element={<SingUp/>}/>
            <Route path='/user' element={<UserView/>}/>
          </Routes>

        </ChakraProvider>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
