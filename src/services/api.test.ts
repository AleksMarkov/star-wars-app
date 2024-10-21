// src/services/api.test.ts
import axios from 'axios';
import { fetchCharacters, fetchCharacterDetails, fetchFilmDetails, fetchStarshipDetails } from './api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  const API_BASE_URL = 'https://sw-api.starnavi.io';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCharacters makes a GET request to fetch characters', async () => {
    const mockData = { results: [{ name: 'Luke Skywalker' }], count: 1 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchCharacters(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/people/?page=1`);
    expect(data).toEqual(mockData);
  });

  it('fetchCharacterDetails makes a GET request to fetch character details', async () => {
    const mockData = { name: 'Luke Skywalker', id: 1 };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchCharacterDetails(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/people/1/`);
    expect(data).toEqual(mockData);
  });

  // Additional tests for fetchFilmDetails and fetchStarshipDetails...

  it('handles errors in fetchCharacters', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchCharacters()).rejects.toThrow('Network Error');
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/people/?page=1`);
  });

  // Similarly, add error handling tests for other fetch functions
});