import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import MaintenanceRequestsTable from "./MaintenanceRequestsTable";

const MaintenanceRequests = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [propertyFilter, setPropertyFilter] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Maintenance Requests
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage all maintenance requests across your properties.
          </p>
        </div>
        <Button onClick={() => navigate("/maintenance/requests/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search requests..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter || ""}
          onValueChange={(value) => setStatusFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={priorityFilter || ""}
          onValueChange={(value) => setPriorityFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={propertyFilter || ""}
          onValueChange={(value) => setPropertyFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Properties</SelectItem>
            <SelectItem value="sunset-apartments">Sunset Apartments</SelectItem>
            <SelectItem value="parkview-residences">
              Parkview Residences
            </SelectItem>
            <SelectItem value="highland-towers">Highland Towers</SelectItem>
            <SelectItem value="riverside-condos">Riverside Condos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Maintenance Requests Table */}
      <MaintenanceRequestsTable
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        propertyFilter={propertyFilter}
      />
    </div>
  );
};

export default MaintenanceRequests;
