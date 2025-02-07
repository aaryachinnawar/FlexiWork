import { useState } from "react";
import { Link } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function FreelancerDashboard() {
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  // Dummy data for charts
  const earningsData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Projects",
        data: [12, 5, 3],
        backgroundColor: ["#FF6B6B", "#4ECDC4", "#FFE66D"],
        borderColor: "#000",
        borderWidth: 2,
      },
    ],
  };

  const analyticsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Earnings ($)",
        data: [500, 800, 1200, 900, 1500, 2000],
        backgroundColor: "#4ECDC4",
        borderColor: "#000",
        borderWidth: 2,
      },
    ],
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    alert(`Proposal submitted!\nCover Letter: ${coverLetter}\nBid Amount: $${bidAmount}`);
    setShowProposalForm(false);
    setCoverLetter("");
    setBidAmount("");
  };

  return (
    <div className="bg-[#E0F4FF] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Freelancer Dashboard</h1>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8">
          <Link to="/jobs" className="neo-button bg-[#4ECDC4] text-black font-bold py-2 px-4">
            Browse Jobs
          </Link>
          <button className="neo-button bg-[#FF6B6B] text-white font-bold py-2 px-4">
            Messages
          </button>
          <button className="neo-button bg-[#FFE66D] text-black font-bold py-2 px-4">
            Earnings
          </button>
        </div>

        {/* Proposals Section */}
        <div className="bg-white neo-brutalist p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Proposals</h2>
          <button
            onClick={() => setShowProposalForm(!showProposalForm)}
            className="neo-button bg-[#4ECDC4] text-black font-bold py-2 px-4 mb-4"
          >
            Submit Proposal
          </button>

          {showProposalForm && (
            <form onSubmit={handleSubmitProposal} className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-2 neo-brutalist"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Bid Amount ($)</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full p-2 neo-brutalist"
                  required
                />
              </div>
              <button type="submit" className="neo-button bg-[#FF6B6B] text-white font-bold py-2 px-4">
                Submit
              </button>
            </form>
          )}
        </div>

        {/* Earnings and Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white neo-brutalist p-6">
            <h2 className="text-2xl font-bold mb-4">Earnings Overview</h2>
            <Pie data={earningsData} />
          </div>

          <div className="bg-white neo-brutalist p-6">
            <h2 className="text-2xl font-bold mb-4">Monthly Analytics</h2>
            <Bar data={analyticsData} />
          </div>
        </div>
      </div>
    </div>
  );
}