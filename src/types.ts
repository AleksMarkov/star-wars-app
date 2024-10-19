// src/types.ts

export interface Character {
    name: string;
    url: string;
    films: number[];
    starships: number[];
    [key: string]: any; // For additional properties
  }
  
  export interface Film {
    title: string;
    starships: number[];
    [key: string]: any;
  }
  
  export interface Starship {
    name: string;
    [key: string]: any;
  }
  