import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SampleList from "../components/SampleList";

const Dashboard = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      {/* Profile Card */}
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h2>Welcome, {user?.name} 👋</h2>
          <p>Email: {user?.email}</p>
        </div>
        <button 
          onClick={handleLogout} 
          style={{
            padding: "10px 15px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>

      {/* Sample Entity Section */}
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#fff"
      }}>
        <h3 style={{ marginBottom: "15px" }}>Manage Sample Entity</h3>
        <SampleList />
      </div>
    </div>
  );
};

export default Dashboard;
