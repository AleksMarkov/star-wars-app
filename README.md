# Star Wars Starship Info

![Star Wars Logo](public/Xwing.svg)

Welcome to **Star Wars Starship Info**, a React-based web application that provides detailed information about Star Wars characters, their associated films, and starships. Explore the vast Star Wars universe with an interactive and visually engaging interface.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Character Grid**: Browse through a grid of Star Wars characters with their images.
- **Character Details**: Click on a character to view detailed information, including their appearances in films and associated starships.
- **Interactive Flow Diagram**: Visualize the relationships between characters, films, and starships using React Flow.
- **Responsive Design**: Optimized for various screen sizes, ensuring a seamless experience on desktops, tablets, and mobile devices.
- **Starfield Background**: Enjoy a dynamic starfield animation as the background, enhancing the Star Wars theme.
- **Loading Indicators**: Visually appealing loading animations while data is being fetched.
- **Error Handling**: User-friendly error messages in case of data fetching issues.
- **Pagination**: Navigate through multiple pages of characters effortlessly.

## Technologies

- **Frontend**:
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [React Router DOM](https://reactrouter.com/)
  - [React Flow Renderer](https://reactflow.dev/)
  - [Axios](https://axios-http.com/)
- **Styling**:
  - CSS Modules
- **Testing**:
  - [Jest](https://jestjs.io/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [TS-Jest](https://kulshekhar.github.io/ts-jest/)
- **Others**:
  - [Create React App](https://create-react-app.dev/)
  - [Web Vitals](https://github.com/GoogleChrome/web-vitals)

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

git clone https://github.com/AleksMarkov/star-wars-app.git
cd star-wars-app

Install Dependencies
Ensure you have Node.js installed. Then, install the required packages:
npm install

or if you prefer using Yarn:
yarn install

After installing the dependencies, you can start the development server:
npm start

or with Yarn:
yarn start

This will launch the application in your default browser at http://localhost:3000. The app will automatically reload if you make changes to the source code.

## Running Tests

The project includes a comprehensive test suite to ensure reliability and maintainability. Here's how you can run the tests:

Run All Tests:
npm test

or with Yarn:
yarn test

This will run all tests in watch mode, allowing you to see real-time feedback as you develop.

Run Tests Once
If you prefer to run the tests a single time without watch mode:

npm run test:coverage

or with Yarn:
yarn test:coverage

View Test Coverage
To generate a coverage report:

npm run test:coverage

or with Yarn:
yarn test:coverage

The coverage report will be available in the coverage directory.

## Project Structure

Here's a brief overview of the project's structure:

star-wars-app/
├── public/
│   ├── Xwing.svg
│   ├── SWSI.svg
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── BackupBack.png
│   │   └── SWSI.svg
│   ├── components/
│   │   ├── CharacterFlow.css
│   │   ├── CharacterFlow.test.tsx
│   │   ├── CharacterFlow.tsx
│   │   ├── CharacterGrid.css
│   │   ├── CharacterGrid.test.tsx
│   │   ├── CharacterGrid.tsx
│   ├── context/
│   │   ├── DataContext.test.tsx
│   │   └── DataContext.tsx
│   ├── services/
│   │   ├── api.test.ts
│   │   └── api.ts
│   ├── types/
│   │   └── types.ts
│   ├── utils/
│   │   ├── StarfieldBackground.test.tsx
│   │   └── StarfieldBackground.tsx
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── jest.config.js
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json

public/: Contains static assets and the main HTML file.
src/: Contains the source code of the application.
assets/: Images and other static assets used in the app.
components/: Reusable React components.
context/: React Context for state management.
services/: API service functions for data fetching.
types/: TypeScript type definitions.
utils/: Utility functions and components.
tests/: Contains test files for components and services.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

Fork the Repository
Click the Fork button at the top right of this page.
Clone Your Fork:

git clone https://github.com/YOUR_USERNAME/star-wars-app.git
cd star-wars-app

Create a New Branch:

git checkout -b feature/YourFeatureName

Make Your Changes:

Implement your feature or bug fix.

Commit Your Changes:

git commit -m "Add your descriptive commit message"

Push to Your Fork:

git push origin feature/YourFeatureName

Open a Pull Request:

Go to the original repository and click the New Pull Request button. Provide a clear description of your changes.

## License

This project is licensed under the MIT License.