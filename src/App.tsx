import React from 'react';
import './App.css';
import GraphList from './components/GraphList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GraphView from './components/GraphView';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<GraphList />} />
        <Route path="/graph/:id" element={<GraphView />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
