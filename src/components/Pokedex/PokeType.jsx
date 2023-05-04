import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'

const PokeType = ({ setOptionType, setPokeType,setForPoke }) => {
  

  const [listTypes, setListTypes] = useState()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/type/`
    useFetch(
      url,
      res => setListTypes(res.data.results),
      err => console.log(err)
      )
    
}, [])

const handleChange = e => {
  setForPoke(false)
  setPokeType(true)
  setOptionType(e.target.value)
}

return (
  <select className='select' onChange={handleChange}>
    <option value="All">All pokemons</option>

    {
      listTypes?.map(type => (
        <option key={type.name} value={type.name}>{type.name} </option>

      ))
    }
  </select>
)
}

export default PokeType