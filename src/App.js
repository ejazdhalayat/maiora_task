import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import StudentList from './component/StudentList';
import StudentForm from './component/StudentForm';
import ProtectedRoute from './auth/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<ProtectedRoute element={<StudentList />} />} />
        <Route path="/add-student" element={<ProtectedRoute element={<StudentForm />} />} />
      </Routes>
    </Router>
  );
};

export default App;
