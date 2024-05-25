import React from 'react';
import {BrowserRouter as Router, Route, Routes  } from 'react-router-dom'; // Change import statement to use BrowserRouter
import Login from './page/Login';
import StudentList from './component/StudentList';
import StudentForm from './component/StudentForm';
// import Home from './component/Home';

const App = () => {
  return (
    <Router> 
      <Routes>
       {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/add-student" element={<StudentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
