// src/components/CharacterGrid.tsx
import React, { useEffect, useState } from 'react';
import { Character } from '../types/types';
import { fetchCharacters } from '../services/api';
import { useNavigate } from 'react-router-dom';
import SWSI from '../assets/SWSI.svg'; // Import the logo
import './CharacterGrid.css';
import XWing from '../assets/Xwing.svg'; // Adjust the path if necessary


const CharacterGrid: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCharacters(page);
        setCharacters(data.results);
        setTotalCharacters(data.count);
      } catch (err: any) {
        setError('Failed to fetch characters');
      } finally {
        setIsLoading(false);
      }
    };
    getCharacters();
  }, [page]);

  const handleCharacterClick = (characterUrl: string) => {
    const idMatch = characterUrl.match(/\/people\/(\d+)\/$/);
    const id = idMatch ? parseInt(idMatch[1], 10) : null;
    if (id) {
      navigate(`/character/${id}`);
    }
  };

  return (
    <div className="container">
      <img src={SWSI} alt="Star Wars Logo" className="logo" />
      
      {isLoading && (
        <div className="loading-overlay" data-testid="loading-spinner" role="status" aria-live="polite">
        <img src={XWing} alt="Loading..." className="xwing" />
      </div>
      )}
      
      {error && <div className="error-message" data-testid="error-message">{error}</div>}
      
      <div className="grid-container">
        {characters.map((character) => {
          const idMatch = character.url.match(/\/people\/(\d+)\/$/);
          const id = idMatch ? parseInt(idMatch[1], 10) : null;
          const imageUrl = id ? `https://starwars-visualguide.com/assets/img/characters/${id}.jpg` : '';

          return (
            <div
              key={character.name}
              className="grid-item"
              onClick={() => handleCharacterClick(character.url)}
              style={{ '--background-image': `url(${imageUrl})` } as React.CSSProperties}
              data-testid="character-card"
            >
              <h2>{character.name}</h2>
            </div>
          );
        })}
      </div>
      
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          {'<'}
        </button>
        <span className="page-number">Page {page}</span>
        <button
          onClick={() => {
            if (page < Math.ceil(totalCharacters / 10)) {
              setPage((p) => p + 1);
            }
          }}
          disabled={page >= Math.ceil(totalCharacters / 10)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default CharacterGrid;
