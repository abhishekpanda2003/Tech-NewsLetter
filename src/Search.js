import React from 'react';
import { useGlobalContext } from './context';

// Search component for allowing users to search for news articles
const Search = () => {
    // Destructuring the 'query' state and 'searchPost' function from the global context
    const { query, searchPost } = useGlobalContext();

    return (
        <>
            <div>
                {/* Title for the search section */}
                <h1>Tech News Page</h1>

                {/* Form to handle the search input */}
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Prevents the default form submission behavior */}
                    <div>
                        {/* Input field for entering the search query */}
                        <input
                            type="text"
                            placeholder="Search Here" // Placeholder text for the input
                            value={query} // Bind the input's value to the current 'query' state
                            onChange={(e) => searchPost(e.target.value)} // Call 'searchPost' on input change
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Search;
