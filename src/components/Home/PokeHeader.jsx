import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PokeHeader = ({ setNawBar, nawBar, setButtonBack, buttonBack }) => {
    const navigate = useNavigate()
    const handleMenu = () => {
        setNawBar(!nawBar)
    }
    const { trainerName } = useSelector(state => state)

    const handlerBack = () => {
        navigate('/pokedex');
        setButtonBack(false)
    }
    return (
        <div className='pokeHeade-Contain'>
            <div className='pokeHeader'>
                <img src="/pokedexLogo.png" alt="" />
                <h2 className='welcomeName'>Welcome <span>{trainerName},</span> Catch them all!</h2>
            </div>

            {
                buttonBack
                    ?
                    <div className={buttonBack ? "buttonArrow" : "buttonArrowNot"}>
                        <button onClick={handlerBack} type="button" className="bx bx-arrow-back"></button>
                    </div>
                    :
                    <div className={nawBar ? "menuResponsiveUp" : "menuResponsive"}>
                        <div onClick={handleMenu} className={nawBar ? "bx bxs-up-arrow" : "bx bxs-down-arrow"}></div>
                    </div>
            }



        </div>

    )
}

export default PokeHeader