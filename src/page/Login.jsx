import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/students";
    } catch (error) {
      alert("Please enter valid credentials");
      console.error("Login failed:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex h-screen justify-center items-center cursor-pointer bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="bg-transparent border border-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Add styles for disabled state
          >
            {loading ? 'Logging in...' : 'Login'} {/* Change button text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
