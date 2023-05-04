import React from 'react'
import '../../styles/typeInfo.css'

const TypeInfo = ({infoStat}) => {
    return (
      <li className='typeInfo'>
         <h4>{infoStat.stat.name}</h4> 
         <p>{infoStat.base_stat}</p>
      </li>
    )
}

export default TypeInfo