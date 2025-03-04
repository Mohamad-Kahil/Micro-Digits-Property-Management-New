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
  Scale,
  MoreVertical,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
} from "lucide-react";

interface ComplianceItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
  property?: string;
  assignedTo?: string;
  description?: string;
}

interface ComplianceListProps {
  limit?: number;
  searchQuery?: string;
  statusFilter?: string | null;
  categoryFilter?: string | null;
}

const mockComplianceItems: ComplianceItem[] = [
  {
    id: "comp-001",
    title: "Annual Fire Safety Inspection",
    category: "safety",
    dueDate: "2023-08-15",
    status: "pending",
    property: "All Properties",
    assignedTo: "John Smith",
    description: "Annual fire safety inspection required by local regulations.",
  },
  {
    id: "comp-002",
    title: "Property Tax Filing",
    category: "tax",
    dueDate: "2023-07-31",
    status: "completed",
    property: "All Properties",
    assignedTo: "Finance Department",
    description: "Annual property tax filing for all managed properties.",
  },
  {
    id: "comp-003",
    title: "Elevator Certification",
    category: "safety",
    dueDate: "2023-06-30",
    status: "overdue",
    property: "Highland Towers",
    assignedTo: "Maintenance Department",
    description:
      "Biannual elevator safety certification required by state law.",
  },
  {
    id: "comp-004",
    title: "ADA Compliance Review",
    category: "accessibility",
    dueDate: "2023-09-15",
    status: "pending",
    property: "All Properties",
    assignedTo: "Legal Department",
    description: "Annual review of ADA compliance for all properties.",
  },
  {
    id: "comp-005",
    title: "Insurance Policy Renewal",
    category: "insurance",
    dueDate: "2023-12-31",
    status: "pending",
    property: "All Properties",
    assignedTo: "Finance Department",
    description: "Annual property insurance policy renewal.",
  },
  {
    id: "comp-006",
    title: "Lead Paint Disclosure",
    category: "disclosure",
    dueDate: "2023-07-15",
    status: "completed",
    property: "Sunset Apartments",
    assignedTo: "Property Manager",
    description: "Required lead paint disclosure for pre-1978 building.",
  },
  {
    id: "comp-007",
    title: "HVAC System Inspection",
    category: "maintenance",
    dueDate: "2023-05-30",
    status: "overdue",
    property: "Parkview Residences",
    assignedTo: "Maintenance Department",
    description: "Quarterly HVAC system inspection and maintenance.",
  },
  {
    id: "comp-008",
    title: "Fair Housing Training",
    category: "training",
    dueDate: "2023-10-15",
    status: "pending",
    property: "Corporate",
    assignedTo: "HR Department",
    description:
      "Annual fair housing training for all property management staff.",
  },
];

const ComplianceList = ({
  limit,
  searchQuery = "",
  statusFilter = null,
  categoryFilter = null,
}: ComplianceListProps) => {
  const navigate = useNavigate();

  // Filter compliance items based on search query, status, and category
  const filteredItems = mockComplianceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
      item.category.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
      (item.property &&
        item.property
          .toLowerCase()
          .includes(searchQuery?.toLowerCase() || "")) ||
      (item.description &&
        item.description
          .toLowerCase()
          .includes(searchQuery?.toLowerCase() || ""));

    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Limit the number of items if specified
  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const getStatusBadge = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("bg-card rounded-lg border shadow-sm table-container")}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Compliance Items</h3>
        </div>
        {!limit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/legal/compliance/new")}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" /> New Compliance Item
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="capitalize">{item.category}</TableCell>
                <TableCell>{item.property || "N/A"}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>{item.assignedTo || "Unassigned"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    {getStatusBadge(item.status)}
                  </div>
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
                        onClick={() => navigate(`/legal/compliance/${item.id}`)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/legal/compliance/${item.id}/edit`)
                        }
                      >
                        Edit Item
                      </DropdownMenuItem>
                      {item.status !== "completed" && (
                        <DropdownMenuItem
                          onClick={() =>
                            console.log("Mark as completed", item.id)
                          }
                        >
                          Mark as Completed
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No compliance items found matching your criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {limit && displayedItems.length > 0 && (
        <div className="p-4 border-t">
          <Button
            variant="link"
            className="w-full"
            onClick={() => navigate("/legal/compliance")}
          >
            View All Compliance Items
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComplianceList;
