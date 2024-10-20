// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterGrid from './components/CharacterGrid';
import CharacterFlow from './components/CharacterFlow';
import { DataProvider } from './context/DataContext';
import StarfieldBackground from './utils/StarfieldBackground';

const App: React.FC = () => {
  return (
    <DataProvider>
      <StarfieldBackground />
      <Router>
        <Routes>
          <Route path="/" element={<CharacterGrid />} />
          <Route path="/character/:id" element={<CharacterFlow />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;