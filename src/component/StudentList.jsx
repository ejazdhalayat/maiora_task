import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loader from "../assets/loader.gif";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/students', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className='p-4 '>
      <div className='flex justify-between mb-4 '>
        <h2 className='text-2xl font-bold'>Student List</h2>
        <Link to="/add-student">
          <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer'>
            Add Student
          </button>
        </Link>
      </div>

      {loading ? (
        <div className='flex justify-center mt-4'>
          <div>
          <img className='h-20 w-16'  src={loader} alt='loader' />

          </div>
         
        </div>
      ) : (
        <table className='min-w-full bg-white border border-gray-200 cursor-pointer'>
          <thead className='bg-blue-400'>
            <tr>
              <th className='py-2 px-4 border-b'>ID</th>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Age</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} className='text-center'>
                <td className='py-2 px-4 border-b'>{student.id}</td>
                <td className='py-2 px-4 border-b'>{student.name}</td>
                <td className='py-2 px-4 border-b'>{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
