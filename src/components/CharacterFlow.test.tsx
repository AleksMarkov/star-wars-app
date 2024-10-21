// src/components/CharacterFlow.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import CharacterFlow from './CharacterFlow';
import { DataContext } from '../context/DataContext';
import { BrowserRouter } from 'react-router-dom';

// Mock react-router-dom hooks and components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
}));

// Mock StarfieldBackground component
jest.mock('../utils/StarfieldBackground', () => ({
  __esModule: true,
  default: () => <div data-testid="starfield-background">Starfield Background</div>,
}));

// Mock reactflow components if necessary
jest.mock('reactflow', () => ({
  ...jest.requireActual('reactflow'),
  ReactFlow: ({ children }: { children: React.ReactNode }) => <div data-testid="react-flow">{children}</div>,
  Background: () => <div data-testid="react-flow-background" />,
}));

describe('CharacterFlow Component', () => {
  const mockFilms = {
    1: { id: 1, title: 'A New Hope', starships: [1] },
    2: { id: 2, title: 'The Empire Strikes Back', starships: [1, 2] },
  };

  const mockStarships = {
    1: { id: 1, name: 'X-wing' },
    2: { id: 2, name: 'TIE Advanced x1' },
  };

  const mockContextValue = {
    films: mockFilms,
    starships: mockStarships,
  };

  const mockCharacter = {
    id: 1,
    name: 'Luke Skywalker',
    url: 'https://sw-api.starnavi.io/people/1/',
    films: [1, 2],
    starships: [1],
  };

  // Mock fetchCharacterDetails
  jest.mock('../services/api', () => ({
    fetchCharacterDetails: jest.fn().mockResolvedValue(mockCharacter),
  }));

  it('renders loading state initially', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <BrowserRouter>
            <CharacterFlow />
          </BrowserRouter>
        </DataContext.Provider>
      );
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders flow diagram after loading', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <BrowserRouter>
            <CharacterFlow />
          </BrowserRouter>
        </DataContext.Provider>
      );
    });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    expect(screen.getByTestId('react-flow')).toBeInTheDocument();
    expect(screen.getByTestId('react-flow-background')).toBeInTheDocument();
  });

  it('handles navigation back to grid', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <BrowserRouter>
            <CharacterFlow />
          </BrowserRouter>
        </DataContext.Provider>
      );
    });

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    const backButton = screen.getByRole('button');
    expect(backButton).toBeInTheDocument();

    // Simulate click
    act(() => {
      backButton.click();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
