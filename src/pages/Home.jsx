import React from 'react'
import ForNameUser from '../components/Home/ForNameUser'
import '../styles/home.css'

//<img className='pokeHeader' src="/pokedexHeader.png" alt="" />

const Home = () => {
  return (
    <div className='home'>
      <img className='pokeLogo' src="/pokedexLogo.png" alt="" />
      <div className='pokeContain'>
        <h2>Hello Trainer!</h2>
        <p>Please give us your name to start</p>
        <ForNameUser />
      </div>
    </div>
  )
}
export default Home