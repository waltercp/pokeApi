import React, { useRef } from 'react'

const ForPoke = ({setPokeSearch, setForPoke, setPokeType}) => {



    const handleSubmit = e => {
        setForPoke(true)
        setPokeType(false)
        e.preventDefault()
        setPokeSearch(e.target.searchText.value.trim().toLowerCase())
    }

    return (

        <form onSubmit={handleSubmit}>
            <input id='searchText' type='text' className='searchText' placeholder='Search pokemon' />
            <button className='btm btn_search'>Search</button>
        </form>

    )
}

export default ForPoke