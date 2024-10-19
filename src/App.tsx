// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterGrid from './CharacterGrid';
import CharacterFlow from './CharacterFlow';
import { DataProvider } from './DataContext';
import StarfieldBackground from './StarfieldBackground';

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