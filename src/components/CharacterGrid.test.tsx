// src/components/CharacterGrid.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import CharacterGrid from './CharacterGrid';
import { DataContext } from '../context/DataContext';
import { BrowserRouter } from 'react-router-dom';

// Mock react-router-dom hooks and components
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock axios
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CharacterGrid Component', () => {
  const mockCharactersResponse = {
    results: [
      { id: 1, name: 'Luke Skywalker', url: 'https://sw-api.starnavi.io/people/1/' },
      { id: 2, name: 'Darth Vader', url: 'https://sw-api.starnavi.io/people/2/' },
    ],
    count: 2,
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockCharactersResponse });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character cards', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={{ films: {}, starships: {} }}>
          <BrowserRouter>
            <CharacterGrid />
          </BrowserRouter>
        </DataContext.Provider>
      );
    });

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('navigates to character details when card is clicked', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

    await act(async () => {
      render(
        <DataContext.Provider value={{ films: {}, starships: {} }}>
          <BrowserRouter>
            <CharacterGrid />
          </BrowserRouter>
        </DataContext.Provider>
      );
    });

    const lukeCard = screen.getByText('Luke Skywalker').closest('.grid-item') as HTMLElement;
    fireEvent.click(lukeCard);

    expect(mockNavigate).toHaveBeenCalledWith('/character/1');
  });

  it('shows loading state', async () => {
    // Mock axios to never resolve to simulate loading
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));

    render(
      <DataContext.Provider value={{ films: {}, starships: {} }}>
        <BrowserRouter>
          <CharacterGrid />
        </BrowserRouter>
      </DataContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch characters'));

    await act(async () => {
      render(
        <DataContext.Provider value={{ films: {}, starships: {} }}>
          <BrowserRouter>
            <CharacterGrid />
          </BrowserRouter>
        </DataContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch characters')).toBeInTheDocument();
    });
  });
});
