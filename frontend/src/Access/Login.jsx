import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this
import LoadingSpinner from "../components/LoadingSpinner"; 
import Scene3D from "../components/Scene3D";

export default function Login({ onSwitchToSignup }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Add this
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const socialLogin = (provider) => {
    showLoading();
    setTimeout(() => {
      hideLoading();
      alert(`${provider} login simulation complete!`);
    }, 1500);
  };

  const showForgotPassword = () => {
    const email = prompt("Enter your email address:");
    if (email) {
      showLoading();
      setTimeout(() => {
        hideLoading();
        alert("Password reset link sent to your email!");
      }, 1500);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    showLoading();
    setTimeout(() => {
      hideLoading();
      alert("Login successful!");
      // Simulate role-based redirection
      const role = localStorage.getItem("userRole"); // Assume role is stored during signup
      if (role === "freelancer") {
        navigate("/dashboard"); // Freelancer Dashboard
      } else {
        navigate("/client-dashboard"); // Client Dashboard
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

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white neo-brutalist p-10 rounded-lg shadow-lg min-h-[500px]">
        <h1 className="text-4xl font-bold mb-6 text-center">FreeLanceNeo</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input 
            type="email"
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
          <button type="submit" className="w-full neo-button text-white font-bold py-2 px-4">
            Login
          </button>
          <div className="text-center">
            <button
              type="button"
              onClick={showForgotPassword}
              className="text-blue-600 underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => socialLogin("google")}
            className="w-full neo-button bg-white text-black font-bold py-2 px-4 flex items-center justify-center gap-2"
          >
            <i className="bi bi-google"></i> Continue with Google
          </button>
          <button
            onClick={() => socialLogin("facebook")}
            className="w-full neo-button bg-blue-600 text-white font-bold py-2 px-4 flex items-center justify-center gap-2"
          >
            <i className="bi bi-facebook"></i> Continue with Facebook
          </button>
        </div>

        <div className="mt-6 text-center">
          <p>
            Don't have an account?{" "}
            <button onClick={onSwitchToSignup} className="text-blue-600 underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
      </div>
     </div>
    </div>
  );
}