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
  PieChart,
  BarChart,
  Download,
  Filter,
  Calendar,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const OccupancyReport = () => {
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
        <h1 className="text-3xl font-bold tracking-tight">Occupancy Reports</h1>
      </div>
      <p className="text-muted-foreground">
        Track occupancy rates, vacancy trends, and tenant turnover across your
        properties.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-12-months">Last 12 Months</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
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
              Current Occupancy Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vacant Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Out of 160 total units
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Days to Rent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.3</div>
            <p className="text-xs text-muted-foreground">
              -3.5 days from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Tenant Turnover Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2%</div>
            <p className="text-xs text-muted-foreground">
              Annual turnover rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-property">By Property</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="turnover">Turnover Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Overview</CardTitle>
              <CardDescription>
                Current occupancy status across all properties
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Occupancy chart would be displayed here</p>
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
                <CardTitle>Occupancy by Unit Type</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Unit type distribution chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Occupancy by Floor</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Floor distribution chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="by-property" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy by Property</CardTitle>
              <CardDescription>
                Compare occupancy rates across different properties
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Property comparison chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Sunset Apartments</div>
                    <div className="text-sm text-muted-foreground">
                      48 units • 45 occupied
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">93.8%</div>
                    <div className="text-sm text-green-600">+2.1%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Parkview Residences</div>
                    <div className="text-sm text-muted-foreground">
                      36 units • 32 occupied
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">88.9%</div>
                    <div className="text-sm text-red-600">-3.6%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Highland Towers</div>
                    <div className="text-sm text-muted-foreground">
                      60 units • 57 occupied
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">95.0%</div>
                    <div className="text-sm text-green-600">+1.7%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">Riverside Condos</div>
                    <div className="text-sm text-muted-foreground">
                      16 units • 14 occupied
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">87.5%</div>
                    <div className="text-sm text-amber-600">0.0%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trends</CardTitle>
              <CardDescription>
                Historical occupancy rates over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Occupancy trend line chart would be displayed here</p>
                <p className="text-sm">
                  Showing monthly data for the past 12 months
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Analysis</CardTitle>
              <CardDescription>
                Identify seasonal patterns in occupancy rates
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Seasonal comparison chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnover" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Turnover Analysis</CardTitle>
              <CardDescription>
                Understand tenant turnover patterns and reasons
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>
                  Turnover reason distribution chart would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Turnover by Lease Length</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Lease length analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Turnover by Unit Type</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Unit type turnover analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OccupancyReport;
