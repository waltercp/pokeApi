import React from 'react'

const PokeHeader = ({ trainerName, setNawBar, nawBar }) => {

    const handleMenu = () => {
        setNawBar(!nawBar)
    }
    return (
        <div className='pokeHeade-Contain'>
            <div className='pokeHeader'>
                <img src="/pokedexLogo.png" alt="" />
                <h2 className='welcomeName'>Welcome <span>{trainerName},</span> Catch them all!</h2>
            </div>
            <div className='menuResponsive'>
                <div onClick={handleMenu} className="bx bxs-down-arrow"></div>
            </div>
        </div>

    )
}

export default PokeHeader