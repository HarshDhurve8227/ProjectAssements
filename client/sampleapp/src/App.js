import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Context/AuthContext';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import BlogForm from './Components/Form';
import BlogList from './Components/List';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-blog" element={<BlogForm/>} />
          <Route path="/blogs" element={<BlogList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
