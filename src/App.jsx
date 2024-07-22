import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./screens/Layouts/Layout";
import UploadDocument from "./screens/UploadDocument";
import ViewReport from "./screens/ViewReport";
import Dashboard from "./screens/Dashboard";
import TaskScreen from "./screens/Task";
import Login from "./screens/Login";
import { useEffect, useState } from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex">
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload-document" element={<UploadDocument />} />
            <Route path="/report" element={<ViewReport />} />
            <Route path="/assign-tasks" element={<TaskScreen />} />
          </Route>
        ) : (
          <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
