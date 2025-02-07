import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this
import LoadingSpinner from "../components/LoadingSpinner";
import Scene3D from "../components/Scene3D" 

export default function Signup({ onSwitchToLogin }) {
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");

// Update your input fields with value and onChange handlers
  const navigate = useNavigate(); // Add this

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!currentRole) {
      alert("Please select a role (Freelancer or Client)");
      return;
    }
    showLoading();
    setTimeout(() => {
      hideLoading();
      alert(`${currentRole} account created successfully!`);
      // Store role in local storage
      localStorage.setItem("userRole", currentRole);
      // Redirect based on role
      if (currentRole === "freelancer") {
        navigate("/dashboard");
      } else {
        navigate("/client-dashboard");
      }
    }, 1500);
  };


  return (
    <div className="relative container mx-auto px-4 py-8 h-screen flex items-center justify-center">
      <LoadingSpinner loading={loading} />

      <div className="flex w-full h-full"> {/* Flex container */}
      
      {/* Left Side: 3D Scene */}
      <div className="w-1/2 hidden lg:block"> {/* Half width on large screens */}
          <Scene3D />
        </div>

       {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white neo-brutalist p-10 rounded-lg shadow-lg min-h-[500px]">
        <h1 className="text-4xl font-bold mb-6 text-center">Create Account</h1>

        <div className="mb-6 space-x-4 text-center">
          <button
            onClick={() => setCurrentRole("freelancer")}
            className="neo-button bg-yellow-400 text-black font-bold py-2 px-4"
          >
            Freelancer
          </button>
          <button
            onClick={() => setCurrentRole("client")}
            className="neo-button bg-green-400 text-black font-bold py-2 px-4"
          >
            Client
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Name</label>
            <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 neo-brutalist" required />
          </div>
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 neo-brutalist" required />
          </div>
          <div>
            <label className="block font-bold mb-2">Password</label>
            <input type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 neo-brutalist" required />
          </div>

          {currentRole === "freelancer" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Skills (comma-separated)</label>
                <input type="text" 
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-2 neo-brutalist" />
              </div>
              <div>
                <label className="block font-bold mb-2">Hourly Rate ($)</label>
                <input type="number" 
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full p-2 neo-brutalist" />
              </div>
            </div>
          )}

          {currentRole === "client" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Company Name</label>
                <input type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2 neo-brutalist" />
              </div>
              <div>
                <label className="block font-bold mb-2">Industry</label>
                <input type="text" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-2 neo-brutalist" />
              </div>
            </div>
          )}

          <button type="submit" className="w-full neo-button bg-purple-500 text-white font-bold py-2 px-4">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-blue-600 underline">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}