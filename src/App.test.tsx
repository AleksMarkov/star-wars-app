// src/App.test.tsx
// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Mock react-router-dom components and hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: () => null,
  useNavigate: () => jest.fn(),
}));

// Mock DataContext
jest.mock('./context/DataContext', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock StarfieldBackground component
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
