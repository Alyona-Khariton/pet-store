import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../shared/auth/ui/Login';
import ProtectedRoute from "./routes/ProtectedRoute";

const Home = () => <h1>Главная страница</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;