import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/PokemonDetails.css'
import HeaderPoke from './shared/HeaderPoke'

const PokemonDetails = () => {

const [pokeInfo, setPokeInfo] = useState()
const [animationName, setAnimationName] = useState("none")

const ulRef = useRef()

useEffect(() => {
  const handleScroll = ()=>{
    const ul = ulRef.current
    const {y} = ul.getBoundingClientRect()

    const animation = y<= 860 ? 'block': 'none'
    
    setAnimationName(animation)

  }
  window.addEventListener('scroll', handleScroll)
  return ()=>{
  window.removeEventListener('scroll', handleScroll)
}
}, [])


  const {name}=useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${name}/`

  axios.get(URL)
  .then(res => setPokeInfo(res.data))
  .catch(err => console.log(err))

  }, [])

  console.log(pokeInfo?.moves)
  return (
    <div>
      <HeaderPoke/>
    <article className='pokemonDetailpage'>
    <img className='imgDetailsPokemon' src={pokeInfo?.sprites.other['official-artwork'].front_default}/>

      <div className='containerDetails'>
      <header className={`headerDetails br__${pokeInfo?.types[0].type.name}`}>
      </header>
      <div className={`pokemonId text__${pokeInfo?.types[0].type.name}`}>#{pokeInfo?.id}</div>
      <div className='pokemonsDetailName'>
      <div className='linea'></div>
      <h1 className={`text__${pokeInfo?.types[0].type.name}`}>{name}</h1>
      <div className='linea'></div>
      </div>
      <ul className='pokemonheight'>
      
        <li>Peso<span>{pokeInfo?.weight}</span></li>
        <li>Altura<span>{pokeInfo?.height}</span></li>
      </ul>
<div className='typesAndabilities'>
      <ul>
        <h3>Type</h3>
        {
          pokeInfo?.types.map(type=>(
            <li className={`features btn__${type.type.name}`} key={type.type.url}>{type.type.name}</li>
          ))
        }
      </ul>
      <ul>
        <h3>Abilities</h3>
        {
          pokeInfo?.abilities.map(ability=>(
            <li className='features' key={ability.ability.url}>{ability.ability.name.replace("-"," ")}</li>
          ))
        }
      </ul>
      </div>
      <div className='statsSection'>
      
        <div className='statsHeader'>
        <h2 className='statsTitle'> Stats</h2> 
        <div className="separador"></div><img className='pokeBolaBN' src='./pokebolafondo.png'/>
        </div>
      

        <ul ref={ulRef} className='statsList'> 
        {
        pokeInfo?.stats.map(stat=>(
          <li key={stat.stat.url}>{stat.stat.name.replace("-"," ")}
          <span>{stat.base_stat}/150
          </span>
          <div className='statBaseBar' style={{display:animationName}}>
              <div className='statBar' style={{width: (stat.base_stat/150*100)+"%"}}></div>
            </div>
            </li>
        ))
        }
  
        </ul>
      </div>
      </div>
      
    
      <div className='containerMoves'>
      <div className='statsSection'>
      <div className='statsHeader'>
        <h2 className='statsTitle'> Movements</h2> 
        <div className="separador"></div><img className='pokeBolaBN' src='./pokebolafondo.png'/>
        </div>
        <ul className='movementsUL'>
        {
          pokeInfo?.moves.map(move=>(
            <li key={move.move.url} className='movements'>{move.move.name.replace("-", " ")}</li>
          ))
        }
        </ul>
      </div>
      </div>
    </article>
    </div>
  )
}

export default PokemonDetails