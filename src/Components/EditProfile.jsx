import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    setUser(storedUser);
    setFormData({
      name: storedUser.name || "",
      email: storedUser.email || "",
      phone: storedUser.phone || "",
      address: storedUser.address || "",
      aadhar: storedUser.aadhar || "",
      role: storedUser.role || storedUser.userType || "",
      specialization:
        storedUser.role === "doctor" ? storedUser.specialization || "" : "",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update user data in state and localStorage
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");
  };

  if (!formData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Specialization (Only for Doctors) */}
        {formData.role === "doctor" && (
          <div>
            <label className="block text-gray-700 font-semibold">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        )}

        {/* Aadhar Number (Read-Only) */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Aadhar Number
          </label>
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Role (Display Only) */}
        <div>
          <label className="block text-gray-700 font-semibold">User Role</label>
          <p className="w-full p-2 border rounded-lg bg-gray-100">
            {formData.role}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
