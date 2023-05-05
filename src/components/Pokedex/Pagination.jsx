import React from 'react'
import '../../styles/paginacion.css'


const Pagination = ({ pagePokemon, currentPage, setCurrentPage, poblacion }) => {
    const pageNumbers = [];

    for (
        let i = 1;
        i <= Math.ceil(poblacion / pagePokemon);
        i++
    ) {
        pageNumbers.push(i)
    }

    const onPreviusPage = () => {
        setCurrentPage(currentPage - 1)
    }
    const onNextsPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const onSpecificPage = (n) => {
        setCurrentPage(n)
    }



    return (
        <nav className='pagination'>
            <button className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''} `} onClick={onPreviusPage} >Back</button>



            <ul className='pagination-list'>
                {currentPage > 2 && (
                    <li className='pagination-list-key'>
                        <button
                            className='pagitation-link'
                            onClick={() => onSpecificPage(1)}
                        >
                            1
                        </button>
                    </li>
                )}
                {currentPage > 3 && (
                    <li className='pagination-list-key'>
                        <span className='pagination-ellipsis'>...</span>
                    </li>
                )}
                {pageNumbers.map(noPage => {
                    if (
                        noPage === currentPage ||
                        noPage === currentPage - 1 ||
                        noPage === currentPage + 1

                    ) {
                        return (
                            <li className='pagination-list-key' key={noPage}>
                                <button
                                    className={`pagitation-link ${noPage === currentPage ? 'is-current' : ''}`}
                                    onClick={() => onSpecificPage(noPage)}
                                >
                                    {noPage}
                                </button>
                            </li>
                        );
                    }
                    return null;
                })}
                {currentPage < pageNumbers.length - 2 && (
                    <li className='pagination-list-key'>
                        <span className='pagination-ellipsis'>...</span>
                    </li>
                )}
                {currentPage < pageNumbers.length - 1 && (
                    <li className='pagination-list-key'>
                        <button
                            className='pagitation-link'
                            onClick={() => onSpecificPage(pageNumbers.length)}
                        >
                            {pageNumbers.length}
                        </button>
                    </li>
                )}
            </ul>

            <button className={`pagination-next ${currentPage >= pageNumbers.length ? 'is-disabled' : ''} `} onClick={onNextsPage}>Next</button>

        </nav>
    )
}

export default Pagination










