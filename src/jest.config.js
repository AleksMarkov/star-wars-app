// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Обрабатывает TypeScript файлы
      '^.+\\.jsx?$': 'babel-jest', // Обрабатывает JSX и ES6 через Babel
      '^.+\\.js$': 'babel-jest'  // Применяет Babel для обычных JS файлов
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)',  // Игнорируем все в node_modules, кроме axios
    ],
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',  // Для CSS модулей
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],  // Обрабатываем TS/TSX как модули ES
  };
  