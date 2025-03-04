import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface RevenueGraphProps {
  title?: string;
  data?: RevenueData[];
  period?: "weekly" | "monthly" | "yearly";
  className?: string;
}

const RevenueGraph = ({
  title = "Revenue Overview",
  data = defaultRevenueData,
  period = "monthly",
  className,
}: RevenueGraphProps) => {
  // Calculate total revenue and profit
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);

  // Calculate percentage change (mock data for demonstration)
  const revenueChange = 12.5; // Positive percentage change
  const profitChange = -3.2; // Negative percentage change

  // Find max value for scaling the chart
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.revenue, item.expenses)),
  );

  return (
    <Card className={cn("h-[300px] bg-card", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </span>
              <div
                className={cn(
                  "flex items-center text-xs",
                  revenueChange > 0 ? "text-green-500" : "text-red-500",
                )}
              >
                {revenueChange > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(revenueChange)}%
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Profit</p>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">
                ${totalProfit.toLocaleString()}
              </span>
              <div
                className={cn(
                  "flex items-center text-xs",
                  profitChange > 0 ? "text-green-500" : "text-red-500",
                )}
              >
                {profitChange > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(profitChange)}%
              </div>
            </div>
          </div>
        </div>

        {/* Chart visualization */}
        <div className="h-[140px] w-full mt-6">
          <div className="flex h-full items-end gap-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="relative flex h-full flex-1 flex-col justify-end"
              >
                {/* Revenue bar */}
                <div
                  className="w-full bg-primary rounded-t"
                  style={{
                    height: `${(item.revenue / maxValue) * 100}%`,
                  }}
                />
                {/* Expenses bar */}
                <div
                  className="w-full bg-primary/30 mt-1 rounded-t"
                  style={{
                    height: `${(item.expenses / maxValue) * 100}%`,
                  }}
                />
                {/* X-axis label */}
                <span className="mt-2 w-full text-center text-xs text-muted-foreground">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-primary/30" />
            <span className="text-xs text-muted-foreground">Expenses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultRevenueData: RevenueData[] = [
  { month: "Jan", revenue: 12500, expenses: 8200, profit: 4300 },
  { month: "Feb", revenue: 14200, expenses: 9100, profit: 5100 },
  { month: "Mar", revenue: 15800, expenses: 9800, profit: 6000 },
  { month: "Apr", revenue: 16900, expenses: 10200, profit: 6700 },
  { month: "May", revenue: 18200, expenses: 11500, profit: 6700 },
  { month: "Jun", revenue: 19500, expenses: 12100, profit: 7400 },
];

export default RevenueGraph;
