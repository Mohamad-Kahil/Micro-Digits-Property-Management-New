import React, { useState } from "react";
import {
  Home,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Unit {
  id: string;
  unitNumber: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rent: number;
  status: "occupied" | "vacant" | "maintenance" | "reserved";
  tenant?: {
    name: string;
    leaseEnd: string;
  };
}

interface PropertyUnitListProps {
  propertyId: string;
}

const mockUnits: Record<string, Unit[]> = {
  "prop-001": [
    {
      id: "unit-101",
      unitNumber: "101",
      type: "Studio",
      bedrooms: 0,
      bathrooms: 1,
      squareFeet: 550,
      rent: 1500,
      status: "occupied",
      tenant: {
        name: "John Smith",
        leaseEnd: "2023-12-31",
      },
    },
    {
      id: "unit-102",
      unitNumber: "102",
      type: "1 Bedroom",
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 750,
      rent: 1800,
      status: "vacant",
    },
    {
      id: "unit-103",
      unitNumber: "103",
      type: "2 Bedroom",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1100,
      rent: 2400,
      status: "maintenance",
    },
    {
      id: "unit-104",
      unitNumber: "104",
      type: "1 Bedroom",
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 800,
      rent: 1900,
      status: "occupied",
      tenant: {
        name: "Emily Johnson",
        leaseEnd: "2024-03-15",
      },
    },
    {
      id: "unit-201",
      unitNumber: "201",
      type: "2 Bedroom",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      rent: 2600,
      status: "occupied",
      tenant: {
        name: "Michael Chen",
        leaseEnd: "2024-02-28",
      },
    },
    {
      id: "unit-202",
      unitNumber: "202",
      type: "Studio",
      bedrooms: 0,
      bathrooms: 1,
      squareFeet: 500,
      rent: 1450,
      status: "reserved",
    },
    {
      id: "unit-203",
      unitNumber: "203",
      type: "1 Bedroom",
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 780,
      rent: 1850,
      status: "vacant",
    },
    {
      id: "unit-204",
      unitNumber: "204",
      type: "2 Bedroom",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1150,
      rent: 2500,
      status: "occupied",
      tenant: {
        name: "Sarah Johnson",
        leaseEnd: "2024-05-31",
      },
    },
  ],
  "prop-002": [
    {
      id: "unit-1A",
      unitNumber: "1A",
      type: "1 Bedroom",
      bedrooms: 1,
      bathrooms: 1.5,
      squareFeet: 850,
      rent: 2200,
      status: "occupied",
      tenant: {
        name: "David Wilson",
        leaseEnd: "2024-01-15",
      },
    },
    {
      id: "unit-1B",
      unitNumber: "1B",
      type: "2 Bedroom",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1300,
      rent: 3100,
      status: "vacant",
    },
    {
      id: "unit-2A",
      unitNumber: "2A",
      type: "1 Bedroom",
      bedrooms: 1,
      bathrooms: 1.5,
      squareFeet: 850,
      rent: 2200,
      status: "occupied",
      tenant: {
        name: "Jessica Taylor",
        leaseEnd: "2024-04-30",
      },
    },
    {
      id: "unit-2B",
      unitNumber: "2B",
      type: "2 Bedroom",
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1300,
      rent: 3100,
      status: "maintenance",
    },
  ],
};

export const PropertyUnitList = ({ propertyId }: PropertyUnitListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const units = mockUnits[propertyId] || [];

  const getStatusBadge = (status: Unit["status"]) => {
    switch (status) {
      case "occupied":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Occupied
          </Badge>
        );
      case "vacant":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Vacant
          </Badge>
        );
      case "maintenance":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Maintenance
          </Badge>
        );
      case "reserved":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Reserved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredUnits = units.filter(
    (unit) =>
      unit.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (unit.tenant?.name.toLowerCase() || "").includes(
        searchQuery.toLowerCase(),
      ),
  );

  // Calculate stats
  const occupiedCount = units.filter(
    (unit) => unit.status === "occupied",
  ).length;
  const vacantCount = units.filter((unit) => unit.status === "vacant").length;
  const maintenanceCount = units.filter(
    (unit) => unit.status === "maintenance",
  ).length;
  const reservedCount = units.filter(
    (unit) => unit.status === "reserved",
  ).length;
  const occupancyRate =
    units.length > 0 ? Math.round((occupiedCount / units.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Units</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Unit
        </Button>
      </div>

      {/* Unit Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{units.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Occupied</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {occupiedCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vacant</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
              <path d="M12 12h.01" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {vacantCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {maintenanceCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Occupancy Rate
            </CardTitle>
            <svg
              className="h-4 w-4 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search units..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Units Table */}
      <div className="rounded-md border table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <div className="flex items-center gap-1">
                  Unit #
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Rent
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUnits.length > 0 ? (
              filteredUnits.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">
                    {unit.unitNumber}
                  </TableCell>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>{unit.squareFeet} sq ft</TableCell>
                  <TableCell>${unit.rent.toLocaleString()}/mo</TableCell>
                  <TableCell>{getStatusBadge(unit.status)}</TableCell>
                  <TableCell>
                    {unit.tenant ? (
                      <div>
                        <div>{unit.tenant.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Lease ends:{" "}
                          {new Date(unit.tenant.leaseEnd).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Unit</DropdownMenuItem>
                        {unit.status === "vacant" && (
                          <DropdownMenuItem>Add Tenant</DropdownMenuItem>
                        )}
                        {unit.status === "occupied" && (
                          <DropdownMenuItem>Manage Lease</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete Unit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No units found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
