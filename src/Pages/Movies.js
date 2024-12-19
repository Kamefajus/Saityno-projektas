import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem('accessToken');  // Patikrinkite AccessToken

            if (!token) {
                // Jei nėra tokeno, nukreipiame į login puslapį
                window.location.href = '/login';
                return;
            }

            try {
                // Apsaugota užklausa, kur Authorization galvutėje nurodysime tokeną
                const response = await axios.get('http://localhost:5133/api/movies', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMovies(response.data);  // Gauname filmų sąrašą
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Filmai</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;
