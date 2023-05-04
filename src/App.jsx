import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonDetails from './pages/PokemonDetails'
import ProtectRotes from './pages/ProtectRotes'
import { Route, Routes } from 'react-router-dom'




function App() {



  //Este hooks permite acceder al valor de los estados generales
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<ProtectRotes />}>
          <Route path='/pokedex' element={<Pokedex/>} />
          <Route path='/pokedex/:name' element={<PokemonDetails/>}/>
        </Route>
      </Routes>

    </div >
  )
}

export default App
