//CharacterGrid.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import CharacterGrid from './components/CharacterGrid';
import { DataContext } from './context/DataContext';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the SWSI logo
jest.mock('../src/assets/SWSI.svg', () => 'mocked-svg');

describe('CharacterGrid Component', () => {
  const mockCharacters = [
    {
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      films: ['A New Hope'],
      starships: ['X-wing']
    },
    {
      id: '2',
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      birth_year: '41.9BBY',
      films: ['A New Hope'],
      starships: ['TIE Advanced x1']
    }
  ];

  const mockContextValue = {
    characters: mockCharacters,
    isLoading: false,
    error: null,
    films: [],
    starships: [],
  };

  it('renders character cards', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <CharacterGrid />
        </DataContext.Provider>
      );
    });

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('navigates to character details when card is clicked', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <CharacterGrid />
        </DataContext.Provider>
      );
    });

    const lukeCard = screen.getByText('Luke Skywalker').closest('[data-testid="character-card"]');
    fireEvent.click(lukeCard!);

    expect(mockNavigate).toHaveBeenCalledWith('/character/1');
  });

  it('shows loading state', async () => {
    const loadingContext = { ...mockContextValue, isLoading: true };
    
    await act(async () => {
      render(
        <DataContext.Provider value={loadingContext}>
          <CharacterGrid />
        </DataContext.Provider>
      );
    });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    const errorContext = { 
      ...mockContextValue, 
      error: 'Failed to fetch characters', 
      characters: [] 
    };
    
    await act(async () => {
      render(
        <DataContext.Provider value={errorContext}>
          <CharacterGrid />
        </DataContext.Provider>
      );
    });

    expect(screen.getByText('Failed to fetch characters')).toBeInTheDocument();
  });
});