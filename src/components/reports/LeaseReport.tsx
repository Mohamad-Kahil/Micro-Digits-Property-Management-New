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
  Calendar,
  LineChart,
  PieChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeaseReport = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("next-12-months");
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
        <h1 className="text-3xl font-bold tracking-tight">Lease Reports</h1>
      </div>
      <p className="text-muted-foreground">
        Track lease renewals, expirations, and tenant turnover across your
        properties.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="next-3-months">Next 3 Months</SelectItem>
              <SelectItem value="next-6-months">Next 6 Months</SelectItem>
              <SelectItem value="next-12-months">Next 12 Months</SelectItem>
              <SelectItem value="past-12-months">Past 12 Months</SelectItem>
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
              Total Active Leases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">148</div>
            <p className="text-xs text-muted-foreground">
              Out of 160 total units
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Within next 90 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Renewal Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-green-600">+5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Lease Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2 mo</div>
            <p className="text-xs text-muted-foreground">
              Average lease duration
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="expirations">
        <TabsList>
          <TabsTrigger value="expirations">Lease Expirations</TabsTrigger>
          <TabsTrigger value="renewals">Renewal Analysis</TabsTrigger>
          <TabsTrigger value="terms">Lease Terms</TabsTrigger>
          <TabsTrigger value="rent-changes">Rent Changes</TabsTrigger>
        </TabsList>

        <TabsContent value="expirations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Lease Expirations</CardTitle>
              <CardDescription>
                Leases expiring in the selected time period
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Lease expiration chart would be displayed here</p>
                <p className="text-sm">
                  Showing data for{" "}
                  {timeRange === "all"
                    ? "all time"
                    : timeRange.replace("-", " ")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expiring Leases by Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">November 2023</div>
                    <div className="text-sm text-muted-foreground">
                      This month
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">12 leases</div>
                    <div className="text-sm text-muted-foreground">
                      8.1% of total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">December 2023</div>
                    <div className="text-sm text-muted-foreground">
                      Next month
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">8 leases</div>
                    <div className="text-sm text-muted-foreground">
                      5.4% of total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">January 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">15 leases</div>
                    <div className="text-sm text-muted-foreground">
                      10.1% of total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="font-medium">February 2024</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">9 leases</div>
                    <div className="text-sm text-muted-foreground">
                      6.1% of total
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Renewal Analysis</CardTitle>
              <CardDescription>
                Historical renewal rates and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Renewal rate trend chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Renewal Rates by Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Sunset Apartments</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">72%</div>
                      <div className="text-sm text-green-600">+4%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Parkview Residences</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">65%</div>
                      <div className="text-sm text-green-600">+2%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Highland Towers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">70%</div>
                      <div className="text-sm text-green-600">+8%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Riverside Condos</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">58%</div>
                      <div className="text-sm text-red-600">-3%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Non-Renewal Reasons</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Non-renewal reason distribution chart would be displayed
                    here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lease Terms Analysis</CardTitle>
              <CardDescription>
                Distribution of lease lengths and terms
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Lease term distribution chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lease Length Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Month-to-Month</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">12 leases</div>
                      <div className="text-sm text-muted-foreground">
                        8.1% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">6 Months</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">18 leases</div>
                      <div className="text-sm text-muted-foreground">
                        12.2% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">12 Months</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">98 leases</div>
                      <div className="text-sm text-muted-foreground">
                        66.2% of total
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">18+ Months</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">20 leases</div>
                      <div className="text-sm text-muted-foreground">
                        13.5% of total
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lease Term Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Lease term trend chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rent-changes" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rent Changes on Renewal</CardTitle>
              <CardDescription>
                Analysis of rent changes when leases are renewed
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Rent change distribution chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Rent Increases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Sunset Apartments</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">3.8%</div>
                      <div className="text-sm text-muted-foreground">
                        Average increase
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Parkview Residences</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">4.2%</div>
                      <div className="text-sm text-muted-foreground">
                        Average increase
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Highland Towers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">3.5%</div>
                      <div className="text-sm text-muted-foreground">
                        Average increase
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">Riverside Condos</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">5.1%</div>
                      <div className="text-sm text-muted-foreground">
                        Average increase
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rent Change Impact on Renewals</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    Renewal rate vs. rent increase chart would be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaseReport;
