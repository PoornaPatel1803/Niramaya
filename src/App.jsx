import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./Components/LoginToggle";
import PatientDashboard from "./pages/Patient_dashboard";
import DoctorDashboard from "./pages/Doctor_dashboard";
import Footer from "./Components/Footer";
import EditProfile from "./Components/EditProfile";

const App = () => {
  return (
    <div className="bg-white">
      <BrowserRouter>

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
