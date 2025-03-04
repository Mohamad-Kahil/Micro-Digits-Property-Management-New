import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { AreaChart, BarChart } from "lucide-react";

interface OccupancyChartProps {
  className?: string;
  data?: {
    month: string;
    occupancyRate: number;
  }[];
  chartType?: "area" | "bar";
  title?: string;
  subtitle?: string;
}

const OccupancyChart = ({
  className,
  data = [
    { month: "Jan", occupancyRate: 85 },
    { month: "Feb", occupancyRate: 82 },
    { month: "Mar", occupancyRate: 87 },
    { month: "Apr", occupancyRate: 90 },
    { month: "May", occupancyRate: 92 },
    { month: "Jun", occupancyRate: 95 },
    { month: "Jul", occupancyRate: 94 },
    { month: "Aug", occupancyRate: 91 },
    { month: "Sep", occupancyRate: 88 },
    { month: "Oct", occupancyRate: 86 },
    { month: "Nov", occupancyRate: 89 },
    { month: "Dec", occupancyRate: 92 },
  ],
  chartType = "area",
  title = "Occupancy Rates",
  subtitle = "Monthly property occupancy percentage",
}: OccupancyChartProps) => {
  // Find the highest and lowest occupancy rates for scaling
  const maxRate = Math.max(...data.map((item) => item.occupancyRate));
  const minRate = Math.min(...data.map((item) => item.occupancyRate));

  // Calculate the range for better visualization
  const range = maxRate - minRate;
  const bottomPadding = 20; // Percentage of chart height to use as bottom padding
  const chartHeight = 200; // Height of the chart area in pixels

  return (
    <Card className={cn("bg-card h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={cn(
              "p-1 rounded-md",
              chartType === "area"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground",
            )}
            onClick={() => {}}
          >
            <AreaChart className="h-4 w-4" />
          </button>
          <button
            className={cn(
              "p-1 rounded-md",
              chartType === "bar"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground",
            )}
            onClick={() => {}}
          >
            <BarChart className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {/* Chart visualization */}
          <div className="relative h-full w-full">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full w-10 flex flex-col justify-between text-xs text-muted-foreground">
              <span>{maxRate}%</span>
              <span>{Math.round((maxRate + minRate) / 2)}%</span>
              <span>{minRate}%</span>
            </div>

            {/* Chart area */}
            <div className="absolute left-12 right-0 top-0 h-full">
              {/* Chart grid lines */}
              <div className="absolute inset-0 grid grid-cols-1 grid-rows-3 border-b border-l">
                <div className="border-b border-border/50"></div>
                <div className="border-b border-border/50"></div>
                <div></div>
              </div>

              {/* Chart data visualization */}
              <div className="absolute inset-0 flex items-end">
                <div className="flex h-full w-full items-end">
                  {data.map((item, index) => {
                    // Calculate the height percentage based on the data point
                    const heightPercentage =
                      ((item.occupancyRate -
                        minRate +
                        (range * bottomPadding) / 100) /
                        (range + (range * bottomPadding) / 100)) *
                      100;

                    return (
                      <div
                        key={index}
                        className="flex h-full flex-1 flex-col justify-end"
                      >
                        {chartType === "bar" ? (
                          <div
                            className="w-4/5 mx-auto bg-primary rounded-t-sm"
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                        ) : (
                          <div className="relative w-full">
                            {index > 0 && (
                              <div
                                className="absolute bottom-0 h-1 w-full bg-primary/20"
                                style={{ bottom: `${heightPercentage}%` }}
                              ></div>
                            )}
                            <div
                              className="w-2 h-2 rounded-full bg-primary mx-auto"
                              style={{ marginBottom: `${heightPercentage}%` }}
                            ></div>
                          </div>
                        )}
                        <span className="mt-1 text-center text-xs text-muted-foreground">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="mr-1.5 h-3 w-3 rounded-full bg-primary"></div>
              <span>Occupancy Rate</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1.5 h-3 w-3 rounded-full bg-primary/20"></div>
              <span>Target (90%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccupancyChart;
