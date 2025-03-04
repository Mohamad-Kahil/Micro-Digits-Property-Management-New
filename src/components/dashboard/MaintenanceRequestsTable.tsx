import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Plus,
} from "lucide-react";
import MaintenanceRequestDialog from "../maintenance/MaintenanceRequestDialog";

interface MaintenanceRequest {
  id: string;
  propertyName: string;
  unitNumber: string;
  requestType: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "emergency";
  dateSubmitted: string;
  tenantName: string;
  tenantEmail?: string;
  tenantPhone?: string;
  tenantAvatar?: string;
  assignedTo?: string;
  assignedVendor?: string;
  estimatedCompletion?: string;
}

interface MaintenanceRequestsTableProps {
  requests?: MaintenanceRequest[];
  className?: string;
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
      tenantEmail: "sarah.johnson@example.com",
      tenantPhone: "(555) 123-4567",
      tenantAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-johnson",
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
      assignedTo: "John Smith",
      assignedVendor: "Electric Experts LLC",
      estimatedCompletion: "2023-06-18",
      tenantEmail: "michael.chen@example.com",
      tenantPhone: "(555) 987-6543",
      tenantAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-chen",
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
      assignedTo: "Robert Johnson",
      tenantEmail: "emma.rodriguez@example.com",
      tenantPhone: "(555) 456-7890",
      tenantAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=emma-rodriguez",
    },
  ],
  className,
  onViewRequest = () => {},
  onUpdateStatus = () => {},
}: MaintenanceRequestsTableProps) => {
  const navigate = useNavigate();
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);

  const handleUpdateRequest = (updatedRequest: MaintenanceRequest) => {
    console.log("Updating request:", updatedRequest);
    // In a real app, you would update the request in your backend
    setIsRequestDialogOpen(false);
  };

  const handleDeleteRequest = (requestId: string) => {
    console.log("Deleting request:", requestId);
    // In a real app, you would delete the request from your backend
    setIsRequestDialogOpen(false);
  };

  const handleAssignRequest = (
    requestId: string,
    staffId: string,
    vendorId: string,
  ) => {
    console.log(
      "Assigning request:",
      requestId,
      "to staff:",
      staffId,
      "and vendor:",
      vendorId,
    );
    // In a real app, you would update the assignment in your backend
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "in-progress":
        return <Wrench className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
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
      case "cancelled":
        return "Cancelled";
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
      case "emergency":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Emergency
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div
      className={cn(
        "bg-card rounded-lg border shadow-sm table-container",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Recent Maintenance Requests</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/maintenance/requests")}
          type="button"
        >
          View All
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
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
                      onClick={() => {
                        setSelectedRequest(request);
                        setIsRequestDialogOpen(true);
                      }}
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

      {/* Request Details Dialog */}
      {selectedRequest && (
        <MaintenanceRequestDialog
          request={selectedRequest}
          isOpen={isRequestDialogOpen}
          onClose={() => setIsRequestDialogOpen(false)}
          onUpdateStatus={onUpdateStatus}
          onAssign={handleAssignRequest}
          onDelete={handleDeleteRequest}
          onUpdate={handleUpdateRequest}
        />
      )}
    </div>
  );
};

export default MaintenanceRequestsTable;
