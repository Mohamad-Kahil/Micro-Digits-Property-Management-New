import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  Wrench,
  WrenchIcon,
} from "lucide-react";

interface MaintenanceRequest {
  id: string;
  propertyName: string;
  unitNumber: string;
  requestType: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dateSubmitted: string;
  tenantName: string;
}

interface MaintenanceRequestsTableProps {
  requests?: MaintenanceRequest[];
  onViewRequest?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

const MaintenanceRequestsTable = ({
  requests = [
    {
      id: "MR-1001",
      propertyName: "Oakwood Apartments",
      unitNumber: "204",
      requestType: "Plumbing",
      description: "Leaking faucet in kitchen",
      status: "pending",
      priority: "medium",
      dateSubmitted: "2023-06-15",
      tenantName: "Sarah Johnson",
    },
    {
      id: "MR-1002",
      propertyName: "Sunset Heights",
      unitNumber: "103",
      requestType: "Electrical",
      description: "Power outlet not working in living room",
      status: "in-progress",
      priority: "high",
      dateSubmitted: "2023-06-14",
      tenantName: "Michael Chen",
    },
    {
      id: "MR-1003",
      propertyName: "Oakwood Apartments",
      unitNumber: "112",
      requestType: "HVAC",
      description: "AC not cooling properly",
      status: "completed",
      priority: "high",
      dateSubmitted: "2023-06-10",
      tenantName: "Emma Rodriguez",
    },
    {
      id: "MR-1004",
      propertyName: "Riverside Condos",
      unitNumber: "305",
      requestType: "Appliance",
      description: "Refrigerator making loud noise",
      status: "pending",
      priority: "low",
      dateSubmitted: "2023-06-13",
      tenantName: "David Wilson",
    },
    {
      id: "MR-1005",
      propertyName: "Sunset Heights",
      unitNumber: "201",
      requestType: "Structural",
      description: "Ceiling water damage in bathroom",
      status: "in-progress",
      priority: "medium",
      dateSubmitted: "2023-06-12",
      tenantName: "Lisa Thompson",
    },
  ],
  onViewRequest = () => {},
  onUpdateStatus = () => {},
}: MaintenanceRequestsTableProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "in-progress":
        return <WrenchIcon className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            High
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm w-full table-container">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Maintenance Requests</h3>
          <Button size="sm" variant="outline">
            <Wrench className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>
                  {request.propertyName}
                  <span className="text-xs text-muted-foreground ml-1">
                    (Unit {request.unitNumber})
                  </span>
                </TableCell>
                <TableCell>{request.requestType}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <span>{getStatusText(request.status)}</span>
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                <TableCell>{request.dateSubmitted}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onViewRequest(request.id)}
                      >
                        View Details
                      </DropdownMenuItem>
                      {request.status !== "completed" && (
                        <DropdownMenuItem
                          onClick={() =>
                            onUpdateStatus(
                              request.id,
                              request.status === "pending"
                                ? "in-progress"
                                : "completed",
                            )
                          }
                        >
                          Mark as{" "}
                          {request.status === "pending"
                            ? "In Progress"
                            : "Completed"}
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {requests.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No maintenance requests found.
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequestsTable;
