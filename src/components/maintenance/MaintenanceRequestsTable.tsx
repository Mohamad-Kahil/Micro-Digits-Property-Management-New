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
} from "lucide-react";
import MaintenanceRequestDialog from "./MaintenanceRequestDialog";

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
  estimatedCompletion?: string;
}

interface MaintenanceRequestsTableProps {
  limit?: number;
  searchQuery?: string;
  statusFilter?: string | null;
  priorityFilter?: string | null;
  propertyFilter?: string | null;
  onViewRequest?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void;
}

const mockRequests: MaintenanceRequest[] = [
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
    tenantEmail: "david.wilson@example.com",
    tenantPhone: "(555) 234-5678",
    tenantAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=david-wilson",
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
    assignedTo: "Mike Davis",
    estimatedCompletion: "2023-06-19",
    tenantEmail: "lisa.thompson@example.com",
    tenantPhone: "(555) 345-6789",
    tenantAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa-thompson",
  },
  {
    id: "MR-1006",
    propertyName: "Highland Towers",
    unitNumber: "405",
    requestType: "Plumbing",
    description: "Toilet constantly running",
    status: "pending",
    priority: "emergency",
    dateSubmitted: "2023-06-16",
    tenantName: "James Wilson",
    tenantEmail: "james.wilson@example.com",
    tenantPhone: "(555) 567-8901",
    tenantAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=james-wilson",
  },
  {
    id: "MR-1007",
    propertyName: "Parkview Residences",
    unitNumber: "12B",
    requestType: "Pest Control",
    description: "Ants in kitchen area",
    status: "in-progress",
    priority: "medium",
    dateSubmitted: "2023-06-14",
    tenantName: "Jennifer Lopez",
    assignedTo: "Pest Solutions Inc.",
    estimatedCompletion: "2023-06-17",
    tenantEmail: "jennifer.lopez@example.com",
    tenantPhone: "(555) 678-9012",
    tenantAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer-lopez",
  },
  {
    id: "MR-1008",
    propertyName: "Oakwood Apartments",
    unitNumber: "301",
    requestType: "Electrical",
    description: "Light fixture flickering in hallway",
    status: "completed",
    priority: "low",
    dateSubmitted: "2023-06-09",
    tenantName: "Thomas Brown",
    assignedTo: "Electric Experts LLC",
    tenantEmail: "thomas.brown@example.com",
    tenantPhone: "(555) 789-0123",
    tenantAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas-brown",
  },
];

const MaintenanceRequestsTable = ({
  limit,
  searchQuery = "",
  statusFilter = null,
  priorityFilter = null,
  propertyFilter = null,
  onViewRequest,
  onUpdateStatus,
}: MaintenanceRequestsTableProps) => {
  const navigate = useNavigate();
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<MaintenanceRequest | null>(null);

  const handleViewRequest = (id: string) => {
    if (onViewRequest) {
      onViewRequest(id);
    } else {
      const request = mockRequests.find((req) => req.id === id);
      if (request) {
        setSelectedRequest(request);
        setIsRequestDialogOpen(true);
      }
    }
  };

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

  // Filter requests based on search query and filters
  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.assignedTo &&
        request.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter ? request.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? request.priority === priorityFilter
      : true;
    const matchesProperty = propertyFilter
      ? request.propertyName.toLowerCase().replace(/\s+/g, "-") ===
        propertyFilter
      : true;

    return matchesSearch && matchesStatus && matchesPriority && matchesProperty;
  });

  // Limit the number of requests if specified
  const displayedRequests = limit
    ? filteredRequests.slice(0, limit)
    : filteredRequests;

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm w-full table-container">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Maintenance Requests</h3>
          {!limit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate("/maintenance/requests/new")}
            >
              <Wrench className="h-4 w-4 mr-2" />
              New Request
            </Button>
          )}
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
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedRequests.length > 0 ? (
              displayedRequests.map((request) => (
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
                  <TableCell>
                    {request.assignedTo || (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
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
                              onUpdateStatus &&
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedRequest(request);
                            setIsRequestDialogOpen(true);
                          }}
                        >
                          Edit Request
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No maintenance requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {limit && displayedRequests.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="link"
            className="w-full"
            onClick={() => navigate("/maintenance/requests")}
          >
            View All Maintenance Requests
          </Button>
        </div>
      )}

      {/* Request Details Dialog */}
      {selectedRequest && (
        <MaintenanceRequestDialog
          request={selectedRequest}
          isOpen={isRequestDialogOpen}
          onClose={() => setIsRequestDialogOpen(false)}
          onUpdateStatus={
            onUpdateStatus || ((id, status) => console.log(id, status))
          }
          onAssign={handleAssignRequest}
          onDelete={handleDeleteRequest}
          onUpdate={handleUpdateRequest}
        />
      )}
    </div>
  );
};

export default MaintenanceRequestsTable;
