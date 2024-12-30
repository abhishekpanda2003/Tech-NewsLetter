import React from 'react';
import { useGlobalContext } from './context';

// Stories component to display news articles or a loading message
const Stories = () => {
    // Destructuring state and actions from context
    const { hits, isLoading, removePost } = useGlobalContext();

    // If the data is still being fetched, display a loading message
    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    // Render the list of stories once data is available
    return (
        <>
            <div className="stories-div">
                {/* Loop through the 'hits' array to display each story */}
                {hits.map((curPost) => {
                    // Destructure relevant fields from the current post
                    const { title, author, objectID, url, num_comments } = curPost;

                    return (
                        <div className="card" key={objectID}>
                            {/* Display the story title */}
                            <h2>{title}</h2>
                            
                            {/* Show the author's name and the number of comments */}
                            <p>
                                By <span> {author} </span> | <span>{num_comments}</span> comments
                            </p>

                            {/* Provide buttons for "Read More" and "Remove" functionality */}
                            <div className="card-button">
                                {/* Link to the full story */}
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    Read More
                                </a>

                                {/* Button to remove the story, calls removePost with objectID */}
                                <a className="remove-button" onClick={() => removePost(objectID)}>
                                    Remove
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Stories;
