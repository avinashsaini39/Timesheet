import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/adminLogin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import ProtectedRoute from './ProtectedRoute';
import UserDashboard from './pages/user/UserDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        
        {/* Protected route */}
        <Route 
          path="/adminpanel" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/userdashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
