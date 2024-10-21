// setupTests.ts
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mock axios
jest.mock('axios');

// Mock canvas context with proper TypeScript types
const mockContext2D = {
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Uint8ClampedArray() })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => new ImageData(1, 1)),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  canvas: document.createElement('canvas')
} as unknown as CanvasRenderingContext2D;

beforeAll(() => {
  // @ts-ignore
  HTMLCanvasElement.prototype.getContext = jest.fn((contextType) => {
    if (contextType === '2d') {
      return mockContext2D;
    }
    return null;
  });
});