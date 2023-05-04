//Archicvo que nos permite crear y configurar nuestro store

import { configureStore } from "@reduxjs/toolkit";
import trainerName from './slices/trainerName.slice'



export default configureStore({
    reducer: {
        //Aqui van todos los estados globales que crearemos
        trainerName
    }
})

