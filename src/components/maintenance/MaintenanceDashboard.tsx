import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Calendar,
  Users,
} from "lucide-react";
import MaintenanceRequestsTable from "./MaintenanceRequestsTable";
import MaintenanceVendorsList from "./MaintenanceVendorsList";
// Placeholder for schedule tab content
const SchedulePlaceholder = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-8">
      <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
      <h3 className="mt-4 text-lg font-medium">Maintenance Schedule</h3>
      <p className="text-sm text-muted-foreground mt-2">
        View your upcoming scheduled maintenance activities.
      </p>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => navigate("/maintenance/schedule")}
      >
        View Full Schedule
      </Button>
    </div>
  );
};

const MaintenanceDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Maintenance Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Overview of maintenance requests, schedules, and vendor information.
          </p>
        </div>
        <Button onClick={() => navigate("/maintenance/requests/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      {/* Maintenance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2 scheduled for today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/maintenance/requests")}
        >
          <Wrench className="mr-2 h-5 w-5" />
          View All Maintenance Requests
        </Button>
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/maintenance/schedule")}
        >
          <Calendar className="mr-2 h-5 w-5" />
          Maintenance Schedule
        </Button>
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/maintenance/vendors")}
        >
          <Users className="mr-2 h-5 w-5" />
          Manage Vendors
        </Button>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Requests</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="schedule">Upcoming Schedule</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-6">
          <MaintenanceRequestsTable limit={5} />
        </TabsContent>
        <TabsContent value="vendors" className="mt-6">
          <MaintenanceVendorsList limit={5} />
        </TabsContent>
        <TabsContent value="schedule" className="mt-6">
          <SchedulePlaceholder />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceDashboard;
