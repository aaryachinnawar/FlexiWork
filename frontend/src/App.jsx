import { useState } from "react";
import { useEffect } from "react";
import Login from "./Access/Login";
import Signup from "./Access/Signup";
import FreelancerDashboard from "./Dashboards/FreelancerDashboard";
import ClientDashboard from "./Dashboards/ClientDashboard";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const role = localStorage.getItem("userRole");
  //   if (role === "freelancer") {
  //     navigate("/dashboard");
  //   } else if (role === "client") {
  //     navigate("/client-dashboard");
  //   }
  // }, [navigate]);


  return (
    <>
      <div className="bg-[#E0F4FF] min-h-screen">
      {isLogin ? (
        <Login onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
    </>
  );
}

export default App;