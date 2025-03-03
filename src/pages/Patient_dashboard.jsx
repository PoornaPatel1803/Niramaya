import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Components/sideBar";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterDate, setFilterDate] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      setMedicalHistory(user.medicalHistory || []);
    }
  }, []);

  const handleSort = () => {
    const sortedHistory = [...medicalHistory].sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );
    setMedicalHistory(sortedHistory);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredHistory = medicalHistory.filter((record) =>
    filterDate ? record.date === filterDate : true
  );

  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); 
    navigate("/"); 
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar with toggle functionality */}
      <Sidebar userType={currentUser?.userType} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Dashboard with dynamic margin */}
      <div 
        className={`flex-1 min-h-screen bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? "ml-64 p-6" : "ml-16 p-4"
        }`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {currentUser ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Welcome, {currentUser.name}
            </h2>

            {/* Sort & Filter Options */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleSort}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Sort by Date ({sortOrder === "asc" ? "Oldest" : "Newest"})
              </button>
              <input
                type="date"
                className="p-2 border rounded-lg"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>

            {/* Medical History Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Medical History</h2>
              {filteredHistory.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredHistory.map((record, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition border"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <p>
                        <strong>Diagnosis:</strong> {record.diagnosis}
                      </p>
                      <p>
                        <strong>Doctor:</strong> {record.doctorName}
                      </p>
                      <p>
                        <strong>Date:</strong> {record.date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No medical history available.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-red-500">
            No patient logged in.
          </p>
        )}

        {/* Popup Modal */}
        <AnimatePresence>
          {selectedRecord && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Medical Record Details
                </h2>
                <p>
                  <strong>Date:</strong> {selectedRecord.date}
                </p>
                <p>
                  <strong>Diagnosis:</strong> {selectedRecord.diagnosis}
                </p>
                <p>
                  <strong>Prescription:</strong> {selectedRecord.prescription}
                </p>
                <p>
                  <strong>Precautions:</strong> {selectedRecord.precautions}
                </p>
                <p>
                  <strong>Doctor:</strong> {selectedRecord.doctorName}
                </p>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PatientDashboard;
