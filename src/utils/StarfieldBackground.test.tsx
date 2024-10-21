// src/utils/StarfieldBackground.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarfieldBackground from './StarfieldBackground';

describe('StarfieldBackground Component', () => {
  it('renders the canvas element', () => {
    const { container } = render(<StarfieldBackground />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('sets the canvas size based on container dimensions', () => {
    const { container } = render(<StarfieldBackground />);
    const div = container.firstChild as HTMLElement;
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    // Mock container dimensions
    Object.defineProperty(div, 'offsetWidth', { value: 800 });
    Object.defineProperty(div, 'offsetHeight', { value: 600 });

    // Trigger resize event
    window.dispatchEvent(new Event('resize'));

    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
  });
});
