// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://sw-api.starnavi.io';

export const fetchCharacters = async (page: number = 1) => {
  const response = await axios.get(`${API_BASE_URL}/people/?page=${page}`);
  return response.data;
};

export const fetchCharacterDetails = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/people/${id}/`);
  return response.data;
};

export const fetchFilmDetails = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/films/${id}/`);
  return response.data;
};

export const fetchStarshipDetails = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/starships/${id}/`);
  return response.data;
};
