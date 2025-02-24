
const VITE_APP_API = import.meta.env.VITE_APP_API

import React, { useState, useEffect } from "react";
import axios from "axios";

const Talents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [freelancers, setFreelancers] = useState([]);
  const [sortCategory, setSortCategory] = useState(""); // Sorting category
  const [selectedSkill, setSelectedSkill] = useState("All"); // Skill filter

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const response = await axios.get(`${VITE_APP_API}/api/freelancers`);
        setFreelancers(response.data);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      }
    };
    fetchFreelancers();
  }, []);

  // **Get unique skills for filtering**
  const allSkills = Array.from(new Set(freelancers.flatMap(f => f.skills)));

  // **Sort freelancers based on category**
  const sortedFreelancers = [...freelancers].sort((a, b) => {
    if (sortCategory === "availability") {
      return b.isAvailable - a.isAvailable;
    } else if (sortCategory === "experience") {
      return parseInt(b.experience) - parseInt(a.experience);
    } else if (sortCategory === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // **Filter freelancers based on search & selected skill**
  const filteredFreelancers = sortedFreelancers.filter(f => 
    f.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedSkill === "All" || f.skills.includes(selectedSkill))
  );

  return (
    <div>
      <h2 className="text-xl font-semibold">Freelancers</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by skill..."
        className="border p-2 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Skill Filter Dropdown */}
      <select
        className="border p-2 mt-2 w-full"
        value={selectedSkill}
        onChange={(e) => setSelectedSkill(e.target.value)}
      >
        <option value="All">All Skills</option>
        {allSkills.map(skill => (
          <option key={skill} value={skill}>{skill}</option>
        ))}
      </select>

      {/* Sorting Buttons */}
      <div className="flex gap-2 mt-3">
        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setSortCategory("name")}>
          Sort by Name
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setSortCategory("availability")}>
          Sort by Availability
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setSortCategory("experience")}>
          Sort by Experience
        </button>
      </div>

      {/* Freelancer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map(freelancer => (
            <div key={freelancer._id} className="p-4 border rounded shadow-md">
              <h3 className="text-lg font-bold mt-2">{freelancer.name}</h3>
              <p className="text-sm text-gray-500">Email: {freelancer.email}</p>
              <p className="text-sm text-gray-500">Experience: {freelancer.experience} years</p>
              <p className="text-sm text-gray-500">Skills: {freelancer.skills.join(", ")}</p>
              <p className={`text-sm font-bold ${freelancer.isAvailable ? "text-green-500" : "text-red-500"}`}>
                {freelancer.isAvailable ? "Available" : "Not Available"}
              </p>
            </div>
          ))
        ) : (
          <p className="mt-4 text-gray-500">No freelancers found.</p>
        )}
      </div>
    </div>
  );
};

export default Talents;
