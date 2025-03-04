import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Calendar,
  Download,
  Filter,
  FileText,
} from "lucide-react";

const ReportsDashboard = () => {
  const navigate = useNavigate();

  const reportCategories = [
    {
      title: "Occupancy Reports",
      description: "Track occupancy rates and vacancy trends across properties",
      icon: PieChart,
      path: "/reports/occupancy",
      color: "text-blue-500",
    },
    {
      title: "Financial Reports",
      description:
        "Analyze revenue, expenses, and overall financial performance",
      icon: TrendingUp,
      path: "/reports/financial",
      color: "text-green-500",
    },
    {
      title: "Maintenance Reports",
      description: "Monitor maintenance requests, costs, and completion times",
      icon: BarChart3,
      path: "/reports/maintenance",
      color: "text-orange-500",
    },
    {
      title: "Lease Reports",
      description: "Track lease renewals, expirations, and tenant turnover",
      icon: Calendar,
      path: "/reports/leases",
      color: "text-purple-500",
    },
    {
      title: "Custom Reports",
      description: "Create and save custom reports with specific parameters",
      icon: FileText,
      path: "/reports/custom",
      color: "text-red-500",
    },
  ];

  const recentReports = [
    { name: "Q3 Financial Summary", date: "2023-10-15", type: "Financial" },
    {
      name: "Maintenance Response Times",
      date: "2023-10-10",
      type: "Maintenance",
    },
    {
      name: "Occupancy Trends - All Properties",
      date: "2023-10-05",
      type: "Occupancy",
    },
    { name: "Lease Renewal Forecast", date: "2023-10-01", type: "Lease" },
  ];

  const savedReports = [
    {
      name: "Monthly Revenue by Property",
      date: "2023-09-15",
      type: "Financial",
    },
    {
      name: "Maintenance Cost Analysis",
      date: "2023-08-22",
      type: "Maintenance",
    },
    { name: "Tenant Turnover Rate", date: "2023-07-30", type: "Occupancy" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground">
          Generate, view, and export reports to analyze your property management
          data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category) => (
          <Card
            key={category.title}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(category.path)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <category.icon className={`h-5 w-5 ${category.color}`} />
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate(category.path)}
                type="button"
              >
                View Reports
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Generated Reports</CardTitle>
              <CardDescription>
                Reports you've generated in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.type} • Generated on {report.date}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" type="button">
                        <Filter className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" type="button">
                        <Download className="h-4 w-4 mr-1" /> Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Report Templates</CardTitle>
              <CardDescription>
                Your saved report configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedReports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {report.type} • Last used on {report.date}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" type="button">
                        <LineChart className="h-4 w-4 mr-1" /> Generate
                      </Button>
                      <Button variant="ghost" size="sm" type="button">
                        <Filter className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsDashboard;
