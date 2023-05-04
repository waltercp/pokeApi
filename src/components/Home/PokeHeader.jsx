import React from 'react'

const PokeHeader = ({trainerName}) => {
    return (
        <div className='pokeHeader'>
            <img src="/pokedexLogo.png" alt="" />
            <h2 className='welcomeName'>Welcome <span>{trainerName},</span> Catch them all!</h2>
        </div>

    )
}

export default PokeHeader