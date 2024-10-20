// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Обрабатываем TypeScript файлы
    '^.+\\.jsx?$': 'babel-jest',  // Обрабатываем JSX файлы через Babel
    '^.+\\.js$': 'babel-jest'  // Обрабатываем JavaScript файлы через Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)',  // Игнорируем node_modules, кроме axios
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',  // Для стилей
    '\\.(svg|png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',  // Для изображений
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],  // Обрабатываем TypeScript как ESM
};
