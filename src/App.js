import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const response = await axios.get('https://localhost:5133/api/movies');
                // Directly set the movies array from the response
                setMovies(response.data); // Assuming response.data is the array of movies
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        loadMovies();
    }, []);

    return (
        <>
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <p key={movie.id}>
                        {movie.title} - {movie.description}
                    </p>
                ))
            ) : (
                <p>Loading movies...</p>
            )}
        </>
    );
};

export default App;
