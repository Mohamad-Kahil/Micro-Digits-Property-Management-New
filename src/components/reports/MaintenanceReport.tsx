import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Download,
  Filter,
  ChevronLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Wrench,
  LineChart,
  PieChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MaintenanceReport = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("last-12-months");
  const [propertyFilter, setPropertyFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8"
          onClick={() => navigate("/reports")}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          Maintenance Reports
        </h1>
      </div>
      <p className="text-muted-foreground">
        Monitor maintenance requests, costs, and completion times across your
        properties.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-12-months">Last 12 Months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="sunset-apartments">
                Sunset Apartments
              </SelectItem>
              <SelectItem value="parkview-residences">
                Parkview Residences
              </SelectItem>
              <SelectItem value="highland-towers">Highland Towers</SelectItem>
              <SelectItem value="riverside-condos">Riverside Condos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" type="button">
            <Filter className="mr-2 h-4 w-4" /> Advanced Filters
          </Button>
          <Button variant="outline" type="button">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">For selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 days</div>
            <p className="text-xs text-green-600">-0.8 days from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">7.3% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Maintenance Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,850</div>
            <p className="text-xs text-red-600">+12.5% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="by-property">By Property</TabsTrigger>
          <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Request Status</CardTitle>
              <CardDescription>
                Current status of all maintenance requests
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Request status distribution chart would be displayed here</p>
                <p className="text-sm">
                  Showing data for{" "}
                  {timeRange === "all"
                    ? "all time"
                    : timeRange.replace("-", " ")}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Volume Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Request volume trend chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Status Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="font-medium">Completed</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">186</div>
                      <div className="text-sm text-muted-foreground">
                        75% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <div className="font-medium">In Progress</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">42</div>
                      <div className="text-sm text-muted-foreground">
                        17% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <div className="font-medium">Open/Pending</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">18</div>
                      <div className="text-sm text-muted-foreground">
                        7% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-gray-500" />
                      <div className="font-medium">Cancelled</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">2</div>
                      <div className="text-sm text-muted-foreground">
                        1% of total
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="by-category" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests by Category</CardTitle>
              <CardDescription>
                Distribution of requests across different categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>
                  Request category distribution chart would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Plumbing</div>
                    <div className="text-sm text-muted-foreground">
                      Leaks, clogs, water issues
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">72</div>
                    <div className="text-sm text-muted-foreground">
                      29% of total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">HVAC</div>
                    <div className="text-sm text-muted-foreground">
                      Heating, cooling, ventilation
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">58</div>
                    <div className="text-sm text-muted-foreground">
                      23% of total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Electrical</div>
                    <div className="text-sm text-muted-foreground">
                      Outlets, lighting, electrical systems
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">45</div>
                    <div className="text-sm text-muted-foreground">
                      18% of total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Appliances</div>
                    <div className="text-sm text-muted-foreground">
                      Refrigerator, stove, dishwasher
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">38</div>
                    <div className="text-sm text-muted-foreground">
                      15% of total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Other</div>
                    <div className="text-sm text-muted-foreground">
                      Miscellaneous requests
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">35</div>
                    <div className="text-sm text-muted-foreground">
                      14% of total
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-property" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests by Property</CardTitle>
              <CardDescription>
                Compare maintenance activity across properties
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Property comparison chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Request Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Sunset Apartments</div>
                      <div className="text-sm text-muted-foreground">
                        48 units
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">82 requests</div>
                      <div className="text-sm text-muted-foreground">
                        1.7 per unit
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Parkview Residences</div>
                      <div className="text-sm text-muted-foreground">
                        36 units
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">65 requests</div>
                      <div className="text-sm text-muted-foreground">
                        1.8 per unit
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Highland Towers</div>
                      <div className="text-sm text-muted-foreground">
                        60 units
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">78 requests</div>
                      <div className="text-sm text-muted-foreground">
                        1.3 per unit
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Riverside Condos</div>
                      <div className="text-sm text-muted-foreground">
                        16 units
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">23 requests</div>
                      <div className="text-sm text-muted-foreground">
                        1.4 per unit
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Time by Property</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Resolution time comparison chart would be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cost-analysis" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Cost Analysis</CardTitle>
              <CardDescription>
                Breakdown of maintenance costs by category and property
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Cost distribution chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">HVAC Repairs</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$14,850</div>
                      <div className="text-sm text-muted-foreground">
                        34.7% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Plumbing</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$9,320</div>
                      <div className="text-sm text-muted-foreground">
                        21.7% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Appliance Replacement</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$8,750</div>
                      <div className="text-sm text-muted-foreground">
                        20.4% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Electrical</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$5,430</div>
                      <div className="text-sm text-muted-foreground">
                        12.7% of total
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Cost trend chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceReport;
