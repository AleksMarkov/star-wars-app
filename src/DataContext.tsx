// src/DataContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface DataContextProps {
  films: Record<number, any>;
  starships: Record<number, any>;
}

export const DataContext = createContext<DataContextProps>({
  films: {},
  starships: {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [films, setFilms] = useState<Record<number, any>>({});
  const [starships, setStarships] = useState<Record<number, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all films
        const filmsResponse = await axios.get('https://sw-api.starnavi.io/films/');
        const filmsData = filmsResponse.data.results;
        const filmsMap: Record<number, any> = {};
        filmsData.forEach((film: any) => {
          filmsMap[film.id] = film;
        });
        setFilms(filmsMap);

        // Fetch all starships (handle pagination if necessary)
        const starshipsMap: Record<number, any> = {};
        let nextStarshipsUrl = 'https://sw-api.starnavi.io/starships/';
        while (nextStarshipsUrl) {
          const starshipsResponse = await axios.get(nextStarshipsUrl);
          const starshipsData = starshipsResponse.data.results;
          starshipsData.forEach((starship: any) => {
            starshipsMap[starship.id] = starship;
          });
          nextStarshipsUrl = starshipsResponse.data.next; // Update the URL for the next page
        }
        setStarships(starshipsMap);
      } catch (error) {
        console.error('Error fetching films and starships:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ films, starships }}>
      {children}
    </DataContext.Provider>
  );
};
