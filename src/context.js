// Importing necessary React features and custom reducer
import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

// Base API URL for fetching news stories
let API = "http://hn.algolia.com/api/v1/search?";

// Initial state for the context
const initialState = {
    isLoading: true, // Indicates whether data is being loaded
    query: "", // Search query entered by the user
    nbPages: 0, // Total number of pages available
    page: 0, // Current page number
    hits: [] // Array of news articles
};

// Creating the context object
const AppContext = React.createContext();

// Provider function to wrap the application with context
const AppProvider = ({ children }) => {
    // Setting up state management using useReducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // Function to fetch data from the API
    const fetchApiData = async (url) => {
        dispatch({ type: "SET_LOADING" }); // Set loading state to true

        try {
            const res = await fetch(url); // Fetching data from the API
            const data = await res.json(); // Parsing the response as JSON
            console.log(data); // Log the data for debugging

            // Dispatch action to update state with fetched data
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                },
            });
        } catch (error) {
            console.log("Error is:", error); // Log any errors during fetch
        }
    };

    // Function to remove a post by ID
    const removePost = (post_ID) => {
        dispatch({
            type: "REMOVE_POST",
            payload: post_ID, // Pass the ID of the post to be removed
        });
    };

    // Function to update the search query
    const searchPost = (searchQuery) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: searchQuery, // Pass the new search query
        });
    };

    // Function to navigate to the next page
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
    };

    // Function to navigate to the previous page
    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        });
    };

    // useEffect to call the API whenever query or page changes
    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);

    // Providing state and functions via context to children components
    return (
        <AppContext.Provider
            value={{
                ...state, // Spread the current state
                removePost, // Provide removePost function
                searchPost, // Provide searchPost function
                getNextPage, // Provide getNextPage function
                getPrevPage, // Provide getPrevPage function
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom Hook to simplify context usage
const useGlobalContext = () => {
    return useContext(AppContext); // Access and return the context value
};

// Exporting the context, provider, and custom hook
export { AppContext, AppProvider, useGlobalContext };
