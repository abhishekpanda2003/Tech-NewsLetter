import React from 'react';
import { useGlobalContext } from './context';

// Pagenav component for navigating between pages of news articles
const Pagenav = () => {
    // Destructuring the current page, total pages, and navigation functions from the global context
    const { page, nbPages, getPrevPage, getNextPage } = useGlobalContext();

    return (
        <>
            <div className="pagination-btn">
                {/* Button to navigate to the previous page */}
                <button onClick={() => getPrevPage()}>PREV</button>

                {/* Display the current page number and total number of pages */}
                <p>
                    {page + 1} of {nbPages}
                </p>

                {/* Button to navigate to the next page */}
                <button onClick={() => getNextPage()}>NEXT</button>
            </div>
        </>
    );
};

export default Pagenav;
