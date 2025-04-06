import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);

  useEffect(() => {
    loadDoctorLists();
  }, []);

  const loadDoctorLists = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const doctorUsers = users.filter(user => user.userType === "doctor");
    setPendingDoctors(doctorUsers.filter(doc => !doc.approved));
    setApprovedDoctors(doctorUsers.filter(doc => doc.approved));
  };

  const updateApproval = (aadhar, status) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(user =>
      user.aadhar === aadhar ? { ...user, approved: status } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    loadDoctorLists();
  };

  const deleteDoctor = (aadhar) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter(user => user.aadhar !== aadhar);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    loadDoctorLists();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Pending Doctor Requests */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Pending Doctor Requests</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Aadhaar</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingDoctors.length > 0 ? (
                pendingDoctors.map((doc) => (
                  <tr key={doc.aadhar} className="border-t">
                    <td className="px-4 py-2">{doc.name}</td>
                    <td className="px-4 py-2">{doc.aadhar}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => updateApproval(doc.aadhar, true)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => deleteDoctor(doc.aadhar)}
                      >
                        Delete Request
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No pending doctor requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approved Doctors */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Approved Doctors</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Aadhaar</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedDoctors.length > 0 ? (
                approvedDoctors.map((doc) => (
                  <tr key={doc.aadhar} className="border-t">
                    <td className="px-4 py-2">{doc.name}</td>
                    <td className="px-4 py-2">{doc.aadhar}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        onClick={() => updateApproval(doc.aadhar, false)}
                      >
                        Disapprove
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => deleteDoctor(doc.aadhar)}
                      >
                        Delete Request
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No approved doctors.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
