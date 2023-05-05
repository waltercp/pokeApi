import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ForPoke from '../components/Pokedex/ForPoke'
import PokeContainer from '../components/Pokedex/PokeContainer'
import useFetch from '../hooks/useFetch'
import PokeType from '../components/Pokedex/PokeType'
import PokeHeader from '../components/Home/PokeHeader'
import Pagination from '../components/Pokedex/Pagination'
import '../styles/pokedex.css'

const Pokedex = () => {
  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [postPerPage, setPostPerPage] = useState(900) //Numero de Pokemones
  const [optionType, setOptionType] = useState('All')

  const [forPoke, setForPoke] = useState(false) //validar pokemones por Busquedad
  const [pokeType, setPokeType] = useState(false) //validar pokemones por tipo

  const [pagePokemon, setPagePokemon] = useState(30) //Numero de Pokemones por pagina
  const [currentPage, setCurrentPage] = useState(1)
  const [hasError, setHasError] = useState(false) //mensaje de error
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    if (optionType !== 'All' && pokeType) {
      const url = `https://pokeapi.co/api/v2/type/${optionType}`;

      useFetch(
        url,
        res => {
          const arr = res.data.pokemon.map(e => e.pokemon);
          setPokemons({ results: arr });
          setHasError(false)
          setIsLoading(false);
        },
        err => console.log(err)
      );

    } else if (pokeSearch && forPoke) {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
      useFetch(
        url,
        res => {
          const obj = {
            results: [{ url }]
          }
          setPokemons(obj)
          setHasError(false)
          setIsLoading(false);
        },
        err => {
          console.log(err)
          setIsLoading(false);
          setHasError(true)
          setTimeout(() => {
            setHasError(false)
            
          }, 1800)
        }
      );

    } else {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${postPerPage}&offset=0`;
      useFetch(
        url,
        res => {
          setPokemons(res.data)
          setHasError(false)
          setIsLoading(false);
        },
        err => console.log(err)
      );
    }

  }, [pokeSearch, optionType]);

  console.log(hasError)


  //Paginacion
  const lastIndex = currentPage * pagePokemon
  const firstIndex = lastIndex - pagePokemon


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
      <Pagination
        pagePokemon={pagePokemon}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        poblacion={pokemons?.results.length}
      />

      <div className='cards-container'>
        <div className='cards-container-poke'>
          {
             isLoading
              ? <h1>cargando</h1>

              : <>
                {
                  hasError
                    ? <h1 className='app_error'>❌ Hey! you must provide an id from 1 to 126😫</h1>
                    : <>
                      {
                        pokemons?.results.map(pokemon => (
                          <PokeContainer
                            key={pokemon.url}
                            url={pokemon.url}
                          />
                        )).slice(firstIndex, lastIndex)
                      }
                    </>
                }

              </>

          }
        </div>
      </div>
    </div>
  )
}

export default Pokedex