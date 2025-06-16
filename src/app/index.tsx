import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../shared/auth/ui/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import MasterPage from './MasterPage/MasterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MasterPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;