import React from "react";
import DashboardLayout from "./layout/DashboardLayout";
import MetricsOverview from "./dashboard/MetricsOverview";
import OccupancyChart from "./dashboard/OccupancyChart";
import RevenueGraph from "./dashboard/RevenueGraph";
import MaintenanceRequestsTable from "./dashboard/MaintenanceRequestsTable";
import LeaseRenewalsTable from "./dashboard/LeaseRenewalsTable";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your property management metrics and activities.
          </p>
        </div>

        {/* Metrics Overview */}
        <MetricsOverview />

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OccupancyChart />
          <RevenueGraph />
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MaintenanceRequestsTable />
          <LeaseRenewalsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
