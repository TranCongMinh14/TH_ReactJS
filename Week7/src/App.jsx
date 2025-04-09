import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Teams from "./pages/Teams";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Integrations from "./pages/Integrations";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Nội dung chính */}
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/integrations" element={<Integrations />} />
            {/* Route mặc định: Chuyển hướng về /dashboard */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;