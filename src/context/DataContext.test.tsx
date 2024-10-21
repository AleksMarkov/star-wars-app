// src/context/DataContext.test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataProvider, DataContext } from './DataContext';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DataContext', () => {
  const mockFilms = {
    results: [
      { id: 1, title: 'A New Hope', starships: [1] },
      { id: 2, title: 'The Empire Strikes Back', starships: [1, 2] },
    ],
    next: null,
  };

  const mockStarshipsPage1 = {
    results: [
      { id: 1, name: 'X-wing' },
      { id: 2, name: 'TIE Advanced x1' },
    ],
    next: null,
  };

  beforeEach(() => {
    mockedAxios.get.mockImplementation((url) => {
      if (url === 'https://sw-api.starnavi.io/films/') {
        return Promise.resolve({ data: mockFilms });
      }
      if (url === 'https://sw-api.starnavi.io/starships/') {
        return Promise.resolve({ data: mockStarshipsPage1 });
      }
      return Promise.reject(new Error('Not Found'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('provides films and starships data', async () => {
    let contextValue: any = {};

    const TestComponent = () => {
      const context = React.useContext(DataContext);
      contextValue = context;
      return <div>Test</div>;
    };

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });

    expect(contextValue.films).toEqual({
      1: { id: 1, title: 'A New Hope', starships: [1] },
      2: { id: 2, title: 'The Empire Strikes Back', starships: [1, 2] },
    });

    expect(contextValue.starships).toEqual({
      1: { id: 1, name: 'X-wing' },
      2: { id: 2, name: 'TIE Advanced x1' },
    });
  });

  it('handles API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    let consoleErrorSpy: jest.SpyInstance;

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const TestComponent = () => {
      const context = React.useContext(DataContext);
      return <div>Test</div>;
    };

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching films and starships:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
