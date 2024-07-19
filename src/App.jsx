import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Layout from "./screens/Layouts/Layout";
import UploadDocument from "./screens/UploadDocument";
import ViewReport from "./screens/ViewReport";
import Dashboard from "./screens/Dashboard";
import TaskScreen from "./screens/Task";
import Login from "./screens/Login";
import { createContext, useState } from "react";
import Employees from "./screens/Employees";

export const authContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex">
      <authContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload-document" element={<UploadDocument />} />
            <Route path="/report" element={<ViewReport />} />
            <Route path="/assign-tasks" element={<TaskScreen />} />
          </Routes>
        </Layout>
      </authContext.Provider>
    </div>
  );
}

export default App;
