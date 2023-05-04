import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ForPoke from '../components/Pokedex/ForPoke'
import PokeContainer from '../components/Pokedex/PokeContainer'
import useFetch from '../hooks/useFetch'
import PokeType from '../components/Pokedex/PokeType'
import '../styles/pokedex.css'
import PokeHeader from '../components/Home/PokeHeader'
import Paginacion from '../components/Pokedex/Paginacion'


const Pokedex = () => {


  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [postPerPage, setPostPerPage] = useState(20)
  const [optionType, setOptionType] = useState('All')

  const [forPoke, setForPoke] = useState(false)
  const [pokeType, setPokeType] = useState(false)




  useEffect(() => {
    if (optionType !== 'All' && pokeType) {
      const url = `https://pokeapi.co/api/v2/type/${optionType}`;

      useFetch(
        url,
        res => {
          const arr = res.data.pokemon.map(e => e.pokemon);
          setPokemons({ results: arr });
        },
        err => console.log(err)
      );

    } else if (pokeSearch && forPoke) {

      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
      const obj = {
        results: [{ url }]
      }
      setPokemons(obj)
    } else {

      const url = `https://pokeapi.co/api/v2/pokemon?limit=${postPerPage}&offset=0`;
      useFetch(
        url,
        res => setPokemons(res.data),
        err => console.log(err)
      );
    }

  }, [pokeSearch, optionType, pokeType]);


  const { trainerName } = useSelector(state => state)
  return (

    <div className='pokePokedex'>
      <PokeHeader trainerName={trainerName} />
      <div className='searchArea'>
        <div className='formArea'>
          <ForPoke
            setPokeSearch={setPokeSearch}
            setForPoke={setForPoke}
            setPokeType={setPokeType}

          />
          <PokeType
            setOptionType={setOptionType}
            setPokeType={setPokeType}
            setForPoke={setForPoke}
          />
        </div>

      </div>

    <Paginacion/>

      <div className='cards-container'>
        <div className='cards-container-poke'>
          {
            pokemons?.results.map(pokemon => (
              <PokeContainer
                key={pokemon.url}
                url={pokemon.url}

              />

            ))
          }

        </div>
      </div>

    </div>
  )
}

export default Pokedex