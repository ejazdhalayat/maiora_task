import React, { useState } from "react";
import axios from "axios";

const StudentForm = () => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleAddStudent = async (event) => {
    event.preventDefault();

    if (!name || !day || !month || !year) {
      alert("Please fill out all fields.");
      return;
    }

    if (day < 1 || day > 31) {
      alert("Day must be between 1 and 31.");
      return;
    }

    if (month < 1 || month > 12) {
      alert("Month must be between 1 and 12.");
      return;
    }

    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
      alert(`Year must be between 1900 and ${currentYear}.`);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/students",
        {
          name,
          day,
          month,
          year,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Data saved successfully!");
      console.log("Student added:", response.data);

      setName("");
      setDay("");
      setMonth("");
      setYear("");
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-bl from-indigo-400 via-purple-400 to-pink-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 p-8 rounded-lg shadow-2xl w-full max-w-md cursor-pointer">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
          Add Student
        </h2>
        <form onSubmit={handleAddStudent} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-200"
          />
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              min="1"
              max="31"
              className="w-1/3 px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-200"
            />
            <input
              type="number"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              className="w-1/3 px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-200"
            />
            <input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1900"
              max={new Date().getFullYear()}
              className="w-1/3 px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
