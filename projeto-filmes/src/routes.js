import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './Pages/Home';
import Filme from './Pages/Filmes'
import Favoritos from './Pages/Favoritos';

import Erro from './Pages/Erro'

import Header from './Components/Header'


function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/filme/:id' element={ <Filme/> }/>
                <Route path='/favoritos' element={ <Favoritos/> }/>
                <Route path='*' element={ <Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp