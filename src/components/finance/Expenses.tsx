import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";

const ExpensesOverview = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage all expenses related to your properties.
          </p>
        </div>
        <Button onClick={() => navigate("/finance/expenses/new")} type="button">
          <Plus className="mr-2 h-4 w-4" /> Record Expense
        </Button>
      </div>

      {/* Expense Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,389</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,500</div>
            <p className="text-xs text-muted-foreground">34% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Utilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,200</div>
            <p className="text-xs text-muted-foreground">19% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Other Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$19,689</div>
            <p className="text-xs text-muted-foreground">47% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search expenses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter || ""}
          onValueChange={(value) => setCategoryFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
            <SelectItem value="taxes">Taxes</SelectItem>
            <SelectItem value="management">Management</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange
          className="w-[300px]"
          selected={dateRange}
          onSelect={(range) =>
            range &&
            setDateRange({
              from: range.from || new Date(),
              to: range.to || new Date(),
            })
          }
        />
      </div>

      {/* Expenses Table */}
      <ExpenseList
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        dateRange={dateRange}
      />
    </div>
  );
};

const Expenses = () => {
  return (
    <Routes>
      <Route path="/" element={<ExpensesOverview />} />
      <Route path="/new" element={<ExpenseForm />} />
      <Route path="/:expenseId/edit" element={<ExpenseForm isEditing />} />
    </Routes>
  );
};

export default Expenses;
