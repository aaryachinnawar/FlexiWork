import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import axios from "axios";
import NavF from "../components/NavF";
import Jobs from "../Pages/Jobs";
const VITE_APP_API = import.meta.env.VITE_APP_API

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function FreelancerDashboard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${VITE_APP_API}/api/messages/freelancer`, {
          headers: { Authorization: localStorage.getItem("token") }
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="bg-[#E0F4FF] min-h-screen p-8">
      <NavF />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Freelancer Dashboard</h1>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-8">
          <Link to="/jobs" className="neo-button bg-[#4ECDC4] text-black font-bold py-2 px-4">
            View Jobs
          </Link>
          <button className="neo-button bg-[#FF6B6B] text-white font-bold py-2 px-4">
            Messages
          </button>
          <button className="neo-button bg-[#FFE66D] text-black font-bold py-2 px-4">
            Earnings
          </button>
        </div>

        {/* Messages Section */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Messages</h2>
          {messages.length === 0 ? (
            <p className="text-gray-600">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {messages.map((msg, index) => (
                <li key={index} className="p-4 border-b">
                  <p className="text-gray-800 font-semibold">{msg.clientName} sent you a message:</p>
                  <p className="text-gray-600">{msg.message}</p>
                  <span className="text-gray-400 text-sm">{new Date(msg.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          <Jobs />
        </div>
      </div>
    </div>
  );
}
