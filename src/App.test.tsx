// App.test.tsx
// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react'; // Убедитесь, что act импортируется из 'react'
import '@testing-library/jest-dom';
import App from './App';

// Мокаем статические ресурсы
jest.mock('./assets/SWSI.svg', () => 'mocked-svg');

// Мокаем модуль DataContext
jest.mock('./context/DataContext', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Мокаем react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: () => null,
  useNavigate: () => jest.fn()
}));

// Мокаем компонент StarfieldBackground
jest.mock('./utils/StarfieldBackground', () => ({
  __esModule: true,
  default: () => <div data-testid="starfield-background">Starfield Background</div>,
}));

describe('App Component', () => {
  it('renders without crashing', async () => {
    let container: HTMLElement | null = null;
    await act(async () => {
      const { container: renderContainer } = render(<App />);
      container = renderContainer;
    });

    const starfieldElement = screen.getByTestId('starfield-background');
    expect(starfieldElement).toBeInTheDocument();
  });

  it('renders within DataProvider', async () => {
    let container: HTMLElement | null = null;
    await act(async () => {
      const { container: renderContainer } = render(<App />);
      container = renderContainer;
    });
    
    expect(container!.firstChild).toBeTruthy();
  });
});
