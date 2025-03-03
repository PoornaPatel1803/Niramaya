import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Components/sideBar";


const DoctorDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  const navigate = useNavigate();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [currentPatient, setCurrentPatient] = useState(null);
  const [showNewRecordForm, setShowNewRecordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newRecord, setNewRecord] = useState({
    diagnosis: '',
    vitals: {
      temperature: '',
      bloodPressure: '',
      pulseRate: '',
      oxygenLevel: ''
    },
    prescription: '',
    precautions: '',
    followUpNotes: '',
    doctorId: JSON.parse(localStorage.getItem('currentUser'))?.id || ''
  });

  const [validationErrors, setValidationErrors] = useState({
    temperature: '',
    bloodPressure: '',
    pulseRate: '',
    oxygenLevel: '',
  });
  

  const handleAadhaarChange = (e) => {
    setAadhaarNumber(e.target.value);
  };

  const handleAadhaarSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const aadhaarClean = aadhaarNumber.replace(/-/g, '');
      if (aadhaarClean.length !== 12) {
        throw new Error('Invalid Aadhaar number');
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const patient = users.find(u => u.aadhar === aadhaarClean && u.userType === 'patient');

      if (!patient) {
        throw new Error('Patient not found');
      }

      setCurrentPatient({
        name: patient.name,
        aadhaar: patient.aadhar,
        age: patient.age || 'N/A',
        gender: patient.gender || 'N/A',
        medicalHistory: patient.medicalHistory || []
      });

      setAadhaarNumber('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); 
    navigate("/"); 
  };


  const handleCreateRecord = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const record = {
        ...newRecord,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        doctorName: JSON.parse(localStorage.getItem('currentUser'))?.name || 'Unknown Doctor'
      };

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(user => {
        if (user.aadhar === currentPatient.aadhaar) {
          user.medicalHistory = [record, ...(user.medicalHistory || [])];
        }
        return user;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setCurrentPatient(prev => ({
        ...prev,
        medicalHistory: [record, ...(prev.medicalHistory || [])]
      }));

      setNewRecord({
        diagnosis: '',
        vitals: {
          temperature: '',
          bloodPressure: '',
          pulseRate: '',
          oxygenLevel: ''
        },
        prescription: '',
        precautions: '',
        followUpNotes: '',
        doctorId: JSON.parse(localStorage.getItem('currentUser'))?.id || ''
      });

      setShowNewRecordForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const [isOpen, setIsOpen] = useState(true);


  return (
    <div className="flex h-screen">
      {/* Sidebar with toggle functionality */}
      <Sidebar userType={"doctor"} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Area */}
      <div 
        className={`flex-1 bg-gray-50 transition-all duration-300 ${
          isOpen ? "ml-64 p-6" : "ml-16 p-4"
        }`}
      >
        <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">Patient Lookup</h2>
        <form onSubmit={handleAadhaarSubmit} className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            className="flex-1 p-2 border rounded-lg"
            value={aadhaarNumber}
            onChange={handleAadhaarChange}
            disabled={isLoading}
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Look up Patient'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {currentPatient && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Patient Information</h2>
              <button
                onClick={() => setShowNewRecordForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create New Record
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Name:</strong> {currentPatient.name}</p>
              <p><strong>Aadhaar:</strong> {currentPatient.aadhaar}</p>
              <p><strong>Age:</strong> {currentPatient.age}</p>
              <p><strong>Gender:</strong> {currentPatient.gender}</p>
            </div>
          </div>
          {showNewRecordForm && (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Create New Medical Record</h2>
    <form onSubmit={handleCreateRecord} className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
  {['temperature', 'bloodPressure', 'pulseRate', 'oxygenLevel'].map((vital, idx) => (
    <div key={idx}>
      <label className="block mb-1 capitalize">{vital.replace(/([A-Z])/g, ' $1')}</label>
      <input
        type="text"
        className="w-full p-2 border rounded-lg"
        value={newRecord.vitals[vital]}
        onChange={(e) => {
          let value = e.target.value;
          let isValid = true;

          if (vital === 'bloodPressure') {
            if (!/^\d{2,3}\/\d{2,3}$/.test(value)) {
              isValid = false;
            } else {
              const [systolic, diastolic] = value.split('/').map(Number);
              isValid = systolic >= 90 && systolic <= 200 && diastolic >= 60 && diastolic <= 120;
            }
          } else {
            if (!/^\d*\.?\d*$/.test(value)) return; // Allow only numbers for other vitals
            const numValue = parseFloat(value);

            switch (vital) {
              case 'temperature':
                isValid = numValue >= 95 && numValue <= 105;
                break;
              case 'pulseRate':
                isValid = numValue >= 40 && numValue <= 180;
                break;
              case 'oxygenLevel':
                isValid = numValue >= 70 && numValue <= 100;
                break;
              default:
                break;
            }
          }

          setNewRecord({
            ...newRecord,
            vitals: { ...newRecord.vitals, [vital]: value },
          });

          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [vital]: isValid ? '' : `Invalid ${vital.replace(/([A-Z])/g, ' $1')}. Enter a valid value.`,
          }));
        }}
        required
      />
      {validationErrors[vital] && <p className="text-red-500 text-sm">{validationErrors[vital]}</p>}
    </div>
  ))}
</div>


      {['diagnosis', 'prescription', 'precautions', 'followUpNotes'].map((field, idx) => (
        <div key={idx}>
          <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
          <textarea
            className="w-full p-2 border rounded-lg"
            value={newRecord[field]}
            onChange={(e) => setNewRecord({ ...newRecord, [field]: e.target.value })}
            required={field !== 'followUpNotes'}
            rows={field === 'followUpNotes' ? 2 : 3}
          />
        </div>
      ))}
      <div className="flex gap-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Record</button>
        <button type="button" onClick={() => setShowNewRecordForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>
      </div>
    </form>
  </div>
)}  {/* Only one closing parenthesis */}


          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Medical History</h2>
            {currentPatient.medicalHistory.length ? (
              currentPatient.medicalHistory.map((record, idx) => (
                <div key={idx} className="border-b pb-4 mb-4">
                  <p><strong>Date:</strong> {record.date}</p>
                  <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                  <p><strong>Prescription:</strong> {record.prescription}</p>
                  <p><strong>Doctor:</strong> {record.doctorName}</p>
                </div>
              ))
            ) : (
              <p>No medical history available.</p>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DoctorDashboard;
