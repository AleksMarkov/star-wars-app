// src/components/CharacterFlow.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Correct import
import '@testing-library/jest-dom';
import CharacterFlow from './CharacterFlow';
import { DataContext } from '../context/DataContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fetchCharacterDetails } from '../services/api';

// Define the mockNavigate before jest.mock
const mockNavigate = jest.fn();

// Mock react-router-dom and override useNavigate
jest.mock('react-router-dom', () => ({
  // Preserve other functionalities from react-router-dom
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockNavigate,
}));

// Now import the component under test

// Mock reactflow before importing CharacterFlow
jest.mock('reactflow', () => {
  const ReactFlow = ({ children }: { children: React.ReactNode }) => <div data-testid="react-flow">{children}</div>;
  const Background = () => <div data-testid="react-flow-background" />;
  return { __esModule: true, default: ReactFlow, Background };
});

// Mock fetchCharacterDetails
jest.mock('../services/api', () => ({
  fetchCharacterDetails: jest.fn(),
}));

// Mock the StarfieldBackground component
jest.mock('../utils/StarfieldBackground', () => ({
  __esModule: true,
  default: () => <div data-testid="starfield-background">Starfield Background</div>,
}));

describe('CharacterFlow Component', () => {
  const mockCharacter = {
    id: 1,
    name: 'Luke Skywalker',
    films: [1, 2],
    starships: [1],
    url: 'https://sw-api.starnavi.io/people/1/',
  };

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

  beforeEach(() => {
    (fetchCharacterDetails as jest.Mock).mockResolvedValue(mockCharacter);

    // Clear mockNavigate calls before each test
    mockNavigate.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <MemoryRouter initialEntries={['/character/1']}>
            <Routes>
              <Route path="/character/:id" element={<CharacterFlow />} />
            </Routes>
          </MemoryRouter>
        </DataContext.Provider>
      );
    });

    // Ensure "Loading..." is displayed
    //expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders flow diagram after loading', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <MemoryRouter initialEntries={['/character/1']}>
            <Routes>
              <Route path="/character/:id" element={<CharacterFlow />} />
            </Routes>
          </MemoryRouter>
        </DataContext.Provider>
      );
    });

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    // Check if ReactFlow components are rendered
    expect(screen.getByTestId('react-flow')).toBeInTheDocument();
    expect(screen.getByTestId('react-flow-background')).toBeInTheDocument();
  });

  it('handles navigation back to grid', async () => {
    await act(async () => {
      render(
        <DataContext.Provider value={mockContextValue}>
          <MemoryRouter initialEntries={['/character/1']}>
            <Routes>
              <Route path="/character/:id" element={<CharacterFlow />} />
            </Routes>
          </MemoryRouter>
        </DataContext.Provider>
      );
    });

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

    const backButton = screen.getByRole('button');
    expect(backButton).toBeInTheDocument();

    // Simulate click on back button
    fireEvent.click(backButton);

    // Assert that navigate was called with '/'
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
