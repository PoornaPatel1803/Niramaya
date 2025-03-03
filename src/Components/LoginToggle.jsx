import React, { useState } from 'react';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    aadhar: '',
    password: '',
    userType: 'patient'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]{12}$/.test(formData.aadhar)) {
      setError('Aadhaar number must be exactly 12 digits.');
      return;
    }
    isLogin ? handleLogin() : handleSignup();
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.aadhar === formData.aadhar);

    if (!user) {
      setError('User not found. Please sign up.');
      return;
    }
    if (user.password !== formData.password) {
      setError('Invalid password.');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = user.userType === 'patient' ? "/patient-dashboard" : "/doctor-dashboard";
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.aadhar === formData.aadhar)) {
      setError('This Aadhaar number is already registered. Please login.');
      setIsLogin(true);
      return;
    }
    const newUser = { ...formData, id: Date.now(), createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setSuccessMessage('Account created successfully!');
    setTimeout(() => navigate(formData.userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-teal-400 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <button className="absolute top-4 left-4 flex items-center text-white hover:underline" onClick={() => navigate('/')}> 
        <ArrowLeft className="mr-2" /> Go Back
      </button>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Welcome to Niramaya</h2>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex border-b border-gray-200 mb-6">
            <button className={`flex-1 py-2 text-center ${isLogin ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setIsLogin(true)}>Login</button>
            <button className={`flex-1 py-2 text-center ${!isLogin ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>
          {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
          {successMessage && <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input name="name" type="text" required value={formData.name} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md" placeholder="John Doe" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
                  <input name="aadhar" type="text" required value={formData.aadhar} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter 12-digit Aadhaar" maxLength="12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input name="age" type="number" required value={formData.age} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your age" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">User Type</label>
                  <select name="userType" value={formData.userType} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md">
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input name="password" type="password" required value={formData.password} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md" placeholder="••••••••" />
                </div>
              </div>
            )}
            {isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
                  <input name="aadhar" type="text" required value={formData.aadhar} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter 12-digit Aadhaar" maxLength="12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input name="password" type="password" required value={formData.password} onChange={handleInputChange} className="block w-full p-2 border border-gray-300 rounded-md" placeholder="••••••••" />
                </div>
              </div>
            )}
            {isLogin && (
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <label className="ml-2 text-sm text-gray-900">Remember me</label>
              </div>
            )}
            <button type="submit" className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md">{isLogin ? 'Sign in' : 'Create Account'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
