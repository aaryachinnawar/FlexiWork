import { useState } from "react";
import { Link } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import NavC from "../components/NavC";
import Talents from "../components/Talents";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ClientDashboard() {
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("talents");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skills: ""
  });

  // Mock data for charts
  const paymentData = {
    labels: ["Completed", "Pending", "In Escrow"],
    datasets: [{
      data: [8, 3, 2],
      backgroundColor: ["#4ECDC4", "#FF6B6B", "#FFE66D"],
      borderColor: "#000",
      borderWidth: 2
    }]
  };

  const escrowHistoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [{
      label: "Escrow Amount ($)",
      data: [2500, 4200, 3800, 5100, 4900],
      backgroundColor: "#4ECDC4",
      borderColor: "#000",
      borderWidth: 2
    }]
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    setJobs([...jobs, {
      ...formData,
      id: Date.now(),
      proposals: [],
      status: "active"
    }]);
    setShowJobForm(false);
    setFormData({ title: "", description: "", budget: "", deadline: "" });
  };

  return (
    <div className="bg-[#E0F4FF] min-h-screen p-8">
      <NavC/>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Client Dashboard</h1>

        {/* Navigation */}
        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setActiveTab("projects")}
            className={`neo-button ${activeTab === "projects" ? "bg-[#4ECDC4]" : "bg-white"}`}
          >
            Manage Projects
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`neo-button ${activeTab === "payments" ? "bg-[#4ECDC4]" : "bg-white"}`}
          >
            Payments
          </button>
          <button
            onClick={() => setActiveTab("talents")}
            className={`neo-button ${activeTab === "talents" ? "bg-[#4ECDC4]" : "bg-white"}`}
          >
            Find Talents
          </button>
          <button
            onClick={() => setShowJobForm(true)}
            className="neo-button bg-[#FF6B6B] text-white"
          >
            Post New Job
          </button>
          
        </div>

            {/* Default Talents View */}
            {activeTab === "talents" && <Talents />}

            {/* Other Conditional Views */}
      

        {/* Job Posting Form */}
        {showJobForm && (
          <div className="bg-white neo-brutalist p-6 mb-8 animate-slideDown">
            <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
            <form onSubmit={handlePostJob} className="space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 neo-brutalist"
                required
              />
              <textarea
                placeholder="Job Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 neo-brutalist"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Budget ($)"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="p-2 neo-brutalist"
                  required
                />
                <input 
                  type="text"
                  placeholder="Skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="p-2 neo-brutalist"
                  required
                
                />
             
              </div>
              <button type="submit" className="neo-button bg-[#4ECDC4] text-black">
                Post Job
              </button>
            </form>
          </div>
        )}

        {/* Active Projects */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {jobs.map(job => (
              <div key={job.id} className="bg-white neo-brutalist p-6 animate-fadeIn">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-gray-600">Budget: ${job.budget}</p>
                  </div>
                  <span className="neo-brutalist px-3 py-1 text-sm">
                    {job.status}
                  </span>
                </div>
                <p className="mb-4">{job.description}</p>
                
                <h4 className="font-bold mb-2">Proposals ({job.proposals.length})</h4>
                {job.proposals.length > 0 ? (
                  job.proposals.map((proposal, index) => (
                    <div key={index} className="neo-brutalist p-4 mb-3">
                      <p className="font-bold">Freelancer Proposal #{index + 1}</p>
                      <p>Bid: ${proposal.bid}</p>
                      <p>{proposal.coverLetter}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No proposals yet</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Payments & Escrow */}
        {activeTab === "payments" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white neo-brutalist p-6">
              <h2 className="text-2xl font-bold mb-4">Payment Distribution</h2>
              <Pie data={paymentData} />
            </div>
            <div className="bg-white neo-brutalist p-6">
              <h2 className="text-2xl font-bold mb-4">Escrow History</h2>
              <Bar data={escrowHistoryData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}