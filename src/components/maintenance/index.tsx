import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MaintenanceDashboard from "./MaintenanceDashboard";
import MaintenanceRequests from "./MaintenanceRequests";
import MaintenanceRequestDetail from "./MaintenanceRequestDetail";
import MaintenanceForm from "./MaintenanceForm";
import MaintenanceVendors from "./MaintenanceVendors";
import MaintenanceSchedule from "./MaintenanceSchedule";
import PreventiveMaintenance from "./PreventiveMaintenance";

const Maintenance = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<MaintenanceDashboard />} />
        <Route path="/requests" element={<MaintenanceRequests />} />
        <Route
          path="/requests/:requestId"
          element={<MaintenanceRequestDetail />}
        />
        <Route path="/requests/new" element={<MaintenanceForm />} />
        <Route
          path="/requests/:requestId/edit"
          element={<MaintenanceForm isEditing />}
        />
        <Route path="/vendors" element={<MaintenanceVendors />} />
        <Route path="/schedule" element={<MaintenanceSchedule />} />
        <Route path="/preventive" element={<PreventiveMaintenance />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Maintenance;
