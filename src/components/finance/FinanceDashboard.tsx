import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  FileText,
  CreditCard,
  TrendingUp,
  Plus,
  BarChart3,
  Receipt,
  Calendar,
} from "lucide-react";
import RevenueChart from "./RevenueChart";
import ExpenseBreakdown from "./ExpenseBreakdown";
import RecentTransactions from "./RecentTransactions";
import UpcomingInvoices from "./UpcomingInvoices";

const FinanceDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Finance Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Overview of your financial metrics, transactions, and reports.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/finance/invoices/new")}
            type="button"
          >
            <FileText className="mr-2 h-4 w-4" /> New Invoice
          </Button>
          <Button
            onClick={() => navigate("/finance/expenses/new")}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" /> Record Expense
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$128,430</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,389</div>
            <p className="text-xs text-red-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$86,041</div>
            <p className="text-xs text-green-500 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 14% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Invoices
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">12 invoices pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/finance/transactions")}
          type="button"
        >
          <DollarSign className="mr-2 h-5 w-5" />
          View All Transactions
        </Button>
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/finance/reports")}
          type="button"
        >
          <BarChart3 className="mr-2 h-5 w-5" />
          Financial Reports
        </Button>
        <Button
          variant="outline"
          className="h-20"
          onClick={() => navigate("/finance/budget")}
          type="button"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Budget Planner
        </Button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueChart />
        <ExpenseBreakdown />
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Upcoming Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-6">
          <RecentTransactions />
        </TabsContent>
        <TabsContent value="invoices" className="mt-6">
          <UpcomingInvoices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceDashboard;
