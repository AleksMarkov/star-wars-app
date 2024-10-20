// src/types.ts

export interface BaseEntity {
  id: number;
  url: string;
  name?: string;
  [key: string]: any; // For additional properties
}

export interface Character extends BaseEntity {
  name: string;
  films: number[];
  starships: number[];
}

export interface Film extends BaseEntity {
  title: string;
  starships: number[];
}

export interface Starship extends BaseEntity {
  name: string;
}
