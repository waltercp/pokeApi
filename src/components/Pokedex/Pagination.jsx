import React from 'react'
import '../../styles/paginacion.css'


const Pagination = ({pagerickMorty, currentPage, setCurrentPage, poblacion }) => {
    const pageNumbers = [];

    for (
        let i = 1;
        i <= Math.ceil(poblacion/pagerickMorty);
        i++
    ) {
        pageNumbers.push(i)
    }

    const onPreviusPage = () =>{
        setCurrentPage(currentPage -1)
    }
    const onNextsPage = () =>{
        setCurrentPage(currentPage +1)
    }
    
    const onSpecificPage = (n) =>{
        setCurrentPage(n)
    }



    return (
        <nav className='pagination'>
           <button className={`pagination-previous ${currentPage ===1?'is-disabled' : ''} `} onClick={onPreviusPage} > Anterior</button>
        

        
            <ul className='pagination-list'>
                {
                    pageNumbers.map(noPage => (
                        <li className='pagination-list-key'  key={noPage}>
                            <button
                                className={`pagitation-link ${noPage === currentPage
                                        ? 'is-current'
                                        : ''
                                    }`}
                                    onClick={()=> onSpecificPage(noPage)}
                            >
                                {noPage}

                            </button>
                        </li>
                    ))
                }
            </ul>

           <button className={`pagination-next ${currentPage >= pageNumbers.length? 'is-disabled': ''} `} onClick={onNextsPage}>Siguiente</button>

        </nav>
    )
}

export default Pagination