import React, { useEffect, useState } from 'react'
import ForPoke from '../components/Pokedex/ForPoke'
import PokeContainer from '../components/Pokedex/PokeContainer'
import useFetch from '../hooks/useFetch'
import PokeType from '../components/Pokedex/PokeType'
import PokeHeader from '../components/Home/PokeHeader'
import Pagination from '../components/Pokedex/Pagination'
import '../styles/pokedex.css'
import { Spinner } from 'react-bootstrap'

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
  const [nawBar, setNawBar] = useState(true)




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
          setCurrentPage(1)
        },
        err => console.log(err)
      );
      setPokeSearch(null);

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
          setCurrentPage(1)
        },
        err => {
          console.log(err)
          setIsLoading(false);
          setHasError(true)
          setTimeout(() => {
            setHasError(false)

          }, 2000)
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

  console.log(nawBar)


  //Paginacion
  const lastIndex = currentPage * pagePokemon
  const firstIndex = lastIndex - pagePokemon


  
  return (

    <div className={'pokePokedex '}>
      <PokeHeader setNawBar={setNawBar} nawBar={nawBar} />
      <div className={`searchArea ${nawBar ? 'active' : ''} `}>
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
      <div className='paginacion-content'>
        {
          (pokemons?.results.length > 1)
            ?
            <Pagination
              pagePokemon={pagePokemon}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              poblacion={pokemons?.results.length}
            />

            : <></>
        }
      </div>

      <div className='cards-container'>
        <div className='cards-container-poke'>
          {
            isLoading
              ? <div className="spinner-container">
                <Spinner className="spinner" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>

              : <>
                {
                  hasError
                    ? <h1 className='app_error'>❌ The name of the pokemon does not exist😫</h1>
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