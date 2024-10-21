// src/components/CharacterGrid.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import CharacterGrid from './CharacterGrid';
import { DataContext } from '../context/DataContext';
import { MemoryRouter } from 'react-router-dom';
import { fetchCharacters } from '../services/api';

// Define the mockNavigate before jest.mock
const mockNavigate = jest.fn();

// Mock react-router-dom and override useNavigate
jest.mock('react-router-dom', () => ({
  // Preserve other functionalities from react-router-dom
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

// Mock fetchCharacters
jest.mock('../services/api', () => ({
  fetchCharacters: jest.fn(),
}));

// Mock the SWSI logo
jest.mock('../assets/SWSI.svg', () => 'mocked-svg');

describe('CharacterGrid Component', () => {
  const mockCharacters = [
    {
      id: 1,
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      films: [1],
      starships: [1],
      url: 'https://sw-api.starnavi.io/people/1/',
    },
    {
      id: 2,
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      birth_year: '41.9BBY',
      films: [1],
      starships: [2],
      url: 'https://sw-api.starnavi.io/people/2/',
    }
  ];

  const mockContextValue = {
    films: {},
    starships: {},
  };

  beforeEach(() => {
    (fetchCharacters as jest.Mock).mockResolvedValue({
      results: mockCharacters,
      count: 2,
    });

    // Clear mockNavigate calls before each test
    mockNavigate.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character cards', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <MemoryRouter>
            <CharacterGrid />
          </MemoryRouter>
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
          <MemoryRouter>
            <CharacterGrid />
          </MemoryRouter>
        </DataContext.Provider>
      );
    });

    const lukeCard = screen.getByText('Luke Skywalker').closest('[data-testid="character-card"]') as HTMLElement;
    fireEvent.click(lukeCard);

    expect(mockNavigate).toHaveBeenCalledWith('/character/1');
  });

  it('shows loading state', async () => {
    // Mock fetchCharacters to return a pending promise to simulate loading
    (fetchCharacters as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));

    render(
      <DataContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <CharacterGrid />
        </MemoryRouter>
      </DataContext.Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    (fetchCharacters as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch characters'));

    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <MemoryRouter>
            <CharacterGrid />
          </MemoryRouter>
        </DataContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText('Failed to fetch characters')).toBeInTheDocument();
    });
  });
});
