import React from "react";
import { ArrowUp, ArrowDown, Home, Wrench, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
  className?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = { value: "0%", trend: "neutral" },
  icon,
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("h-full stat-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-1 flex items-center text-xs">
          {change.trend === "up" && (
            <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
          )}
          {change.trend === "down" && (
            <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
          )}
          <span
            className={cn(
              change.trend === "up" && "text-emerald-500",
              change.trend === "down" && "text-rose-500",
              change.trend === "neutral" && "text-muted-foreground",
            )}
          >
            {change.value}
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  metrics?: {
    occupancy: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
    revenue: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
    maintenance: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
    renewals: {
      value: string;
      change: { value: string; trend: "up" | "down" | "neutral" };
    };
  };
  className?: string;
}

const MetricsOverview = ({
  metrics = {
    occupancy: { value: "92%", change: { value: "2.1%", trend: "up" } },
    revenue: { value: "$24,389", change: { value: "4.3%", trend: "up" } },
    maintenance: { value: "12", change: { value: "3", trend: "down" } },
    renewals: { value: "8", change: { value: "0", trend: "neutral" } },
  },
  className,
}: MetricsOverviewProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      <MetricCard
        title="Occupancy Rate"
        value={metrics.occupancy.value}
        change={metrics.occupancy.change}
        icon={<Home className="h-4 w-4 text-primary" />}
      />
      <MetricCard
        title="Monthly Revenue"
        value={metrics.revenue.value}
        change={metrics.revenue.change}
        icon={
          <svg
            className="h-4 w-4 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 16.03 9.4 16.99 10.9 17.3V19H13.24V17.33C14.76 17.04 15.96 16.17 15.97 14.56C15.96 12.36 14.07 11.6 12.31 11.14Z"
              fill="currentColor"
            />
          </svg>
        }
      />
      <MetricCard
        title="Maintenance Requests"
        value={metrics.maintenance.value}
        change={metrics.maintenance.change}
        icon={<Wrench className="h-4 w-4 text-primary" />}
      />
      <MetricCard
        title="Upcoming Renewals"
        value={metrics.renewals.value}
        change={metrics.renewals.change}
        icon={<Calendar className="h-4 w-4 text-primary" />}
      />
    </div>
  );
};

export default MetricsOverview;
