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
  FileCheck,
  Clock,
  AlertTriangle,
  FileText,
  MoreVertical,
  Calendar,
  Download,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import ContractDetailsDialog from "./ContractDetailsDialog";

interface Contract {
  id: string;
  title: string;
  type: string;
  status: "active" | "expiring" | "expired" | "draft";
  startDate: string;
  endDate: string;
  parties: string[];
  value?: number;
  property?: string;
  description?: string;
  fileUrl?: string;
}

interface ContractsListProps {
  limit?: number;
  searchQuery?: string;
  statusFilter?: string | null;
  typeFilter?: string | null;
  dateRange?: DateRange;
}

const mockContracts: Contract[] = [
  {
    id: "contract-001",
    title: "Lease Agreement - Sunset Apartments Unit 204",
    type: "lease",
    status: "active",
    startDate: "2023-01-15",
    endDate: "2024-01-14",
    parties: ["Micro Digits Property Management", "Sarah Johnson"],
    value: 18000,
    property: "Sunset Apartments",
    description: "Standard 12-month lease agreement for residential unit 204.",
  },
  {
    id: "contract-002",
    title: "Maintenance Service Agreement",
    type: "service",
    status: "expiring",
    startDate: "2023-03-01",
    endDate: "2023-08-31",
    parties: ["Micro Digits Property Management", "Maintenance Pros Inc."],
    value: 24000,
    description: "Quarterly maintenance services for all properties.",
  },
  {
    id: "contract-003",
    title: "Property Insurance Policy",
    type: "insurance",
    status: "active",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    parties: ["Micro Digits Property Management", "SafeGuard Insurance"],
    value: 12500,
    property: "All Properties",
    description: "Comprehensive property insurance coverage.",
  },
  {
    id: "contract-004",
    title: "Landscaping Services Agreement",
    type: "service",
    status: "active",
    startDate: "2023-04-01",
    endDate: "2024-03-31",
    parties: ["Micro Digits Property Management", "Green Thumb Services"],
    value: 9600,
    property: "Multiple Properties",
    description: "Monthly landscaping and grounds maintenance.",
  },
  {
    id: "contract-005",
    title: "Elevator Maintenance Contract",
    type: "service",
    status: "expired",
    startDate: "2022-07-01",
    endDate: "2023-06-30",
    parties: ["Micro Digits Property Management", "Elevator Tech Co."],
    value: 7200,
    property: "Highland Towers",
    description: "Quarterly elevator inspection and maintenance.",
  },
  {
    id: "contract-006",
    title: "Lease Agreement - Parkview Residences Unit 1A",
    type: "lease",
    status: "expiring",
    startDate: "2022-09-01",
    endDate: "2023-08-31",
    parties: ["Micro Digits Property Management", "Michael Chen"],
    value: 21600,
    property: "Parkview Residences",
    description: "Standard 12-month lease agreement for residential unit 1A.",
  },
  {
    id: "contract-007",
    title: "Pest Control Services",
    type: "service",
    status: "active",
    startDate: "2023-05-15",
    endDate: "2024-05-14",
    parties: ["Micro Digits Property Management", "Pest Solutions Inc."],
    value: 4800,
    property: "All Properties",
    description: "Quarterly pest control treatments for all properties.",
  },
  {
    id: "contract-008",
    title: "Property Management Software License",
    type: "service",
    status: "draft",
    startDate: "2023-08-01",
    endDate: "2024-07-31",
    parties: ["Micro Digits Property Management", "PropTech Solutions"],
    value: 3600,
    description: "Annual license for property management software.",
  },
];

const ContractsList = ({
  limit,
  searchQuery = "",
  statusFilter = null,
  typeFilter = null,
  dateRange,
}: ContractsListProps) => {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  );

  // Filter contracts based on search query, status, type, and date range
  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.parties.some((party) =>
        party.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      (contract.property &&
        contract.property.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter
      ? contract.status === statusFilter
      : true;
    const matchesType = typeFilter ? contract.type === typeFilter : true;

    const startDate = new Date(contract.startDate);
    const endDate = new Date(contract.endDate);
    const matchesDateRange = dateRange
      ? (dateRange.from ? endDate >= dateRange.from : true) &&
        (dateRange.to ? startDate <= dateRange.to : true)
      : true;

    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

  // Limit the number of contracts if specified
  const displayedContracts = limit
    ? filteredContracts.slice(0, limit)
    : filteredContracts;

  const getStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "expiring":
        return (
          <Badge className="bg-amber-100 text-amber-800">Expiring Soon</Badge>
        );
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case "expiring":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "draft":
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (contract: Contract) => {
    setSelectedContract(contract);
    setIsDetailsOpen(true);
  };

  return (
    <div className={cn("bg-card rounded-lg border shadow-sm table-container")}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Contracts</h3>
        </div>
        {!limit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/legal/contracts/new")}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" /> New Contract
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parties</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedContracts.length > 0 ? (
            displayedContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.title}</TableCell>
                <TableCell className="capitalize">{contract.type}</TableCell>
                <TableCell>{contract.parties.join(", ")}</TableCell>
                <TableCell>{contract.startDate}</TableCell>
                <TableCell>{contract.endDate}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(contract.status)}
                    {getStatusBadge(contract.status)}
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
                        onClick={() => handleViewDetails(contract)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/legal/contracts/${contract.id}/edit`)
                        }
                      >
                        Edit Contract
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          console.log("Download contract", contract.id)
                        }
                      >
                        Download
                      </DropdownMenuItem>
                      {contract.status === "expiring" && (
                        <DropdownMenuItem
                          onClick={() =>
                            console.log("Renew contract", contract.id)
                          }
                        >
                          Renew Contract
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
                No contracts found matching your criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {limit && displayedContracts.length > 0 && (
        <div className="p-4 border-t">
          <Button
            variant="link"
            className="w-full"
            onClick={() => navigate("/legal/contracts")}
          >
            View All Contracts
          </Button>
        </div>
      )}

      {/* Contract Details Dialog */}
      {selectedContract && (
        <ContractDetailsDialog
          contract={selectedContract}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default ContractsList;
