import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage (or an API)
    const storedUser = JSON.parse(localStorage.getItem("user")) || {}; 
    setUser(storedUser);
  }, []);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    aadhar: user?.aadhar || "", // Read-only
    role: user?.role || "", // Read-only
    specialization: user?.role === "doctor" ? user?.specialization || "" : "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      aadhar: user?.aadhar || "", // Read-only
      role: user?.role || "", // Read-only
      specialization: user?.role === "doctor" ? user?.specialization || "" : "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    alert("Profile updated successfully!");
    // Save updated data to localStorage or send it to an API
    localStorage.setItem("user", JSON.stringify(formData));
  };

  if (!user) return <p>Loading...</p>; // Prevent rendering empty fields before user data is available

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-semibold">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-semibold">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        {/* Specialization (Only for Doctors) */}
        {formData.role === "doctor" && (
          <div>
            <label className="block text-gray-700 font-semibold">Specialization</label>
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
        )}

        {/* Aadhar Number (Read-Only) */}
        <div>
          <label className="block text-gray-700 font-semibold">Aadhar Number</label>
          <input type="text" name="aadhar" value={formData.aadhar} readOnly className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed" />
        </div>

        {/* Role (Read-Only) */}
        <div>
          <label className="block text-gray-700 font-semibold">User Role</label>
          <input type="text" name="role" value={formData.role} readOnly className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
