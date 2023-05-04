import React, { useRef } from 'react'
import { setTrainerName } from '../../store/slices/trainerName.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const ForNameUser = () => {

    //const{trainerName} = useSelector(state => state)


    const dispatch = useDispatch()
    const inputName = useRef()

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerName(inputName.current.value.trim()))
        navigate('/pokedex')
    }

    return (
        <form className='formHome' onSubmit={handleSubmit}>
            <input className='inputHome' ref={inputName} type="text" />
            <button className='buttonHome'>Start</button>
        </form>
    )
}

export default ForNameUser