import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import AdminDashboard from "./components/Dashboard";
import VehicleManagement from "./components/VehicleManagement";
import VehicleaddForm from "./components/vehicleaddForm";
import VehiculeupdateForm from "./components/vheicleupdateForm";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/vehiclemanagement" element={<VehicleManagement />} />
          <Route path="/vehicleaddform" element={<VehicleaddForm />} />
          <Route path="/vehiculeupdateform" element={<VehiculeupdateForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
