import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import ReportsDashboard from "./ReportsDashboard";
import OccupancyReport from "./OccupancyReport";
import FinancialReport from "./FinancialReport";
import MaintenanceReport from "./MaintenanceReport";
import LeaseReport from "./LeaseReport";
import CustomReport from "./CustomReport";

const Reports = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<ReportsDashboard />} />
        <Route path="/occupancy" element={<OccupancyReport />} />
        <Route path="/financial" element={<FinancialReport />} />
        <Route path="/maintenance" element={<MaintenanceReport />} />
        <Route path="/leases" element={<LeaseReport />} />
        <Route path="/custom" element={<CustomReport />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Reports;
