
import React, { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
}

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Parse only if data exists
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        localStorage.removeItem("user"); // Remove invalid data
      }
    }
  }, []);

  return (
    <div className="container-p">
      <div className="card profile-card shadow">
        <div className="card-body ">
        <i className=" user-icon fa-solid fa-circle-user"></i>
          <h3 >{user.name || "Guest"}</h3>
          <h3 >{user.email || "No Email"}</h3>
          <button 
            className="btn mt-3"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
