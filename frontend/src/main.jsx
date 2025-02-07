import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import FreelancerDashboard from "./Dashboards/FreelancerDashboard";
import JobListings from "./FreeLancer/JobListings";
import ClientDashboard from "./Dashboards/ClientDashboard";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<FreelancerDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/jobs" element={<JobListings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);