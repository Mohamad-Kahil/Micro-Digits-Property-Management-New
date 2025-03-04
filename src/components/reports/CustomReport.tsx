import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  Save,
  Download,
  BarChart,
  LineChart,
  PieChart,
  Table,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomReport = () => {
  const navigate = useNavigate();
  const [reportName, setReportName] = useState("");
  const [reportType, setReportType] = useState("financial");
  const [dateRange, setDateRange] = useState("last-12-months");
  const [selectedProperties, setSelectedProperties] = useState<string[]>([
    "all",
  ]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [chartType, setChartType] = useState("bar");
  const [groupBy, setGroupBy] = useState("month");

  const handleMetricToggle = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const handlePropertyToggle = (property: string) => {
    if (property === "all") {
      setSelectedProperties(["all"]);
      return;
    }

    // Remove "all" if it's selected
    const withoutAll = selectedProperties.filter((p) => p !== "all");

    if (selectedProperties.includes(property)) {
      const newSelection = withoutAll.filter((p) => p !== property);
      setSelectedProperties(newSelection.length === 0 ? ["all"] : newSelection);
    } else {
      setSelectedProperties([...withoutAll, property]);
    }
  };

  const getMetricOptions = () => {
    switch (reportType) {
      case "financial":
        return [
          { id: "revenue", label: "Total Revenue" },
          { id: "expenses", label: "Total Expenses" },
          { id: "noi", label: "Net Operating Income" },
          { id: "cash-flow", label: "Cash Flow" },
          { id: "roi", label: "Return on Investment" },
          { id: "cap-rate", label: "Cap Rate" },
        ];
      case "occupancy":
        return [
          { id: "occupancy-rate", label: "Occupancy Rate" },
          { id: "vacancy-rate", label: "Vacancy Rate" },
          { id: "days-vacant", label: "Average Days Vacant" },
          { id: "turnover-rate", label: "Turnover Rate" },
        ];
      case "maintenance":
        return [
          { id: "request-count", label: "Request Count" },
          { id: "resolution-time", label: "Resolution Time" },
          { id: "maintenance-cost", label: "Maintenance Cost" },
          { id: "request-by-category", label: "Requests by Category" },
        ];
      case "lease":
        return [
          { id: "lease-expirations", label: "Lease Expirations" },
          { id: "renewal-rate", label: "Renewal Rate" },
          { id: "avg-lease-term", label: "Average Lease Term" },
          { id: "rent-changes", label: "Rent Changes" },
        ];
      default:
        return [];
    }
  };

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
          Custom Report Builder
        </h1>
      </div>
      <p className="text-muted-foreground">
        Create customized reports by selecting specific metrics, properties, and
        date ranges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Report Configuration */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>
                Define the parameters for your custom report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  placeholder="Enter a name for your report"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="occupancy">Occupancy</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="lease">Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date-range">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger id="date-range">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                      <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                      <SelectItem value="last-6-months">
                        Last 6 Months
                      </SelectItem>
                      <SelectItem value="last-12-months">
                        Last 12 Months
                      </SelectItem>
                      <SelectItem value="year-to-date">Year to Date</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {dateRange === "custom" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>Properties</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="property-all"
                      checked={selectedProperties.includes("all")}
                      onCheckedChange={() => handlePropertyToggle("all")}
                    />
                    <Label htmlFor="property-all">All Properties</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="property-sunset"
                      checked={selectedProperties.includes("sunset")}
                      onCheckedChange={() => handlePropertyToggle("sunset")}
                      disabled={selectedProperties.includes("all")}
                    />
                    <Label htmlFor="property-sunset">Sunset Apartments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="property-parkview"
                      checked={selectedProperties.includes("parkview")}
                      onCheckedChange={() => handlePropertyToggle("parkview")}
                      disabled={selectedProperties.includes("all")}
                    />
                    <Label htmlFor="property-parkview">
                      Parkview Residences
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="property-highland"
                      checked={selectedProperties.includes("highland")}
                      onCheckedChange={() => handlePropertyToggle("highland")}
                      disabled={selectedProperties.includes("all")}
                    />
                    <Label htmlFor="property-highland">Highland Towers</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Metrics</Label>
                <div className="grid grid-cols-2 gap-2">
                  {getMetricOptions().map((metric) => (
                    <div
                      key={metric.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`metric-${metric.id}`}
                        checked={selectedMetrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                      />
                      <Label htmlFor={`metric-${metric.id}`}>
                        {metric.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chart-type">Chart Type</Label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger id="chart-type">
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="table">Table</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group-by">Group By</Label>
                  <Select value={groupBy} onValueChange={setGroupBy}>
                    <SelectTrigger id="group-by">
                      <SelectValue placeholder="Select grouping" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="quarter">Quarter</SelectItem>
                      <SelectItem value="year">Year</SelectItem>
                      <SelectItem value="property">Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button">
                <Save className="mr-2 h-4 w-4" /> Save Template
              </Button>
              <Button type="button">
                <BarChart className="mr-2 h-4 w-4" /> Generate Report
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>Preview of your custom report</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                {chartType === "bar" && (
                  <BarChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                )}
                {chartType === "line" && (
                  <LineChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                )}
                {chartType === "pie" && (
                  <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                )}
                {chartType === "table" && (
                  <Table className="h-16 w-16 mx-auto mb-4 opacity-50" />
                )}
                <p>Your report will appear here after generation</p>
                <p className="text-sm mt-2">
                  {selectedMetrics.length > 0
                    ? `${selectedMetrics.length} metrics selected`
                    : "No metrics selected"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                disabled={selectedMetrics.length === 0}
                type="button"
              >
                <Download className="mr-2 h-4 w-4" /> Export Preview
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-summary">Include Summary</Label>
                <Checkbox id="include-summary" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-charts">Include Charts</Label>
                <Checkbox id="include-charts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-raw-data">Include Raw Data</Label>
                <Checkbox id="include-raw-data" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">Auto-refresh</Label>
                <Checkbox id="auto-refresh" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomReport;
