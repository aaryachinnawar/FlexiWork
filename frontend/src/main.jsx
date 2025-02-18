import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./Access/Login";
import Signup from "./Access/Signup";
import FreelancerDashboard from "./Dashboards/FreelancerDashboard";
import ClientDashboard from "./Dashboards/ClientDashboard";
import JobListings from "./FreeLancer/JobListings";
import './Font'; // Import fonts
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<FreelancerDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/jobs" element={<JobListings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
