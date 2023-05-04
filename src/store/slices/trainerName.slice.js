import { createSlice } from "@reduxjs/toolkit";


//Permite crear un estado global
const trainerNameslice = createSlice({
    name: 'trainName',
    initialState: '',
    reducers: {
        
        //Todas las opciones que nos permiten cambiar el estado, por ejemplo el SETSTATE

        setTrainerName : (state, action) =>action.payload  //Lo que me pasa el usuario como parametro
    }
})

//Aqui se exportan todas las Action

export const { setTrainerName  } = trainerNameslice .actions

//Representante del estado global
export default trainerNameslice.reducer