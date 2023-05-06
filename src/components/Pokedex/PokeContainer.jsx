import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch'
import TypeInfo from './TypeInfo'
import { useNavigate } from 'react-router-dom'
import '../../styles/pokeContain.css'


const PokeContainer = ({ url }) => {

  const [pokemon, setPokemon] = useState()
  const [loading, setLoading] = useState(true);  // Saber si las Imagenes ya cargaron
  

  useEffect(() => {
    setLoading(true)
    useFetch(
      url,
      res => {
        setPokemon(res.data);
        setLoading(false);
      },
      err => console.log(err)
    )

  }, [])

  const clase = pokemon?.types[0].type.name



  //Priemra letra en Mayuscula
  const firstLetter = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "";
    }
  }

  const navigate = useNavigate()
  const handleClick = () => navigate(`/pokedex/${pokemon.name}`)
  

  return (
    <article className={`Pokecard br__${clase}`}>

      <header className={`bg__${clase}`}>
        {loading ? (
          <div className='pokeLoading'>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className='circle-light'>
            <img onClick={handleClick} className='pokemonImg' src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt='' />

          </div>
        )
        }
      </header>

      <div className='card_info_container'>

        <section className='cardBody'>
          <h3 onClick={handleClick} >{firstLetter(pokemon?.name)}</h3>

          <ul>
            {pokemon?.types.map((slot, index) => (
              <li key={slot.type.url}>
                {`${firstLetter(slot.type.name)}${index !== pokemon.types.length - 1 ? ' /' : ''}`}
              </li>
            ))
            }
          </ul>
        </section >

        <section className='pokeInfo'>
          <ul>
            {pokemon?.stats.map(stat => (
              <TypeInfo
                key={stat.stat.url}
                infoStat={stat}

              />
            ))
            }
          </ul>
        </section>


      </div>
    </article>
  )
}


export default PokeContainer