import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 24500 },
  { month: "Feb", revenue: 26300 },
  { month: "Mar", revenue: 28400 },
  { month: "Apr", revenue: 27800 },
  { month: "May", revenue: 29600 },
  { month: "Jun", revenue: 32100 },
  { month: "Jul", revenue: 31500 },
  { month: "Aug", revenue: 33200 },
  { month: "Sep", revenue: 34800 },
  { month: "Oct", revenue: 36500 },
  { month: "Nov", revenue: 38200 },
  { month: "Dec", revenue: 42300 },
];

const RevenueChart = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
