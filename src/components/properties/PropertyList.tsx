import React, { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
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
import { useNavigate } from "react-router-dom";

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  occupancyRate: number;
  status: "active" | "inactive" | "maintenance";
}

const mockProperties: Property[] = [
  {
    id: "prop-001",
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90001",
    type: "Apartment Complex",
    units: 24,
    occupancyRate: 92,
    status: "active",
  },
  {
    id: "prop-002",
    name: "Parkview Residences",
    address: "456 Park Ave, San Francisco, CA 94101",
    type: "Condominium",
    units: 16,
    occupancyRate: 88,
    status: "active",
  },
  {
    id: "prop-003",
    name: "Highland Towers",
    address: "789 Highland St, Seattle, WA 98101",
    type: "Apartment Complex",
    units: 32,
    occupancyRate: 95,
    status: "active",
  },
  {
    id: "prop-004",
    name: "Riverside Condos",
    address: "321 River Rd, Portland, OR 97201",
    type: "Condominium",
    units: 12,
    occupancyRate: 75,
    status: "maintenance",
  },
  {
    id: "prop-005",
    name: "Oakwood Apartments",
    address: "555 Oak St, Austin, TX 78701",
    type: "Apartment Complex",
    units: 20,
    occupancyRate: 90,
    status: "active",
  },
  {
    id: "prop-006",
    name: "Metro Lofts",
    address: "888 Metro Ave, Chicago, IL 60601",
    type: "Loft",
    units: 8,
    occupancyRate: 100,
    status: "active",
  },
  {
    id: "prop-007",
    name: "Lakeside Villas",
    address: "777 Lake Dr, Miami, FL 33101",
    type: "Villa",
    units: 6,
    occupancyRate: 83,
    status: "active",
  },
  {
    id: "prop-008",
    name: "Mountain View Apartments",
    address: "444 Mountain Rd, Denver, CO 80201",
    type: "Apartment Complex",
    units: 18,
    occupancyRate: 0,
    status: "inactive",
  },
];

const PropertyList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const navigate = useNavigate();

  const handleViewProperty = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  const getStatusBadge = (status: Property["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Inactive
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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-2">
            Manage your property portfolio and units.
          </p>
        </div>
        <Button onClick={() => navigate("/properties/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </div>

      {/* Property Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
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
            <div className="text-2xl font-bold">
              {properties.reduce((sum, property) => sum + property.units, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Occupancy
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                properties
                  .filter((p) => p.status === "active")
                  .reduce(
                    (sum, property, _, arr) =>
                      sum + property.occupancyRate / arr.length,
                    0,
                  ),
              )}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Properties
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {properties.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search properties..."
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

      {/* Properties Table */}
      <div className="rounded-md border table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div className="flex items-center gap-1">
                  Property Name
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Occupancy
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    <div>
                      {property.name}
                      <div className="text-xs text-muted-foreground mt-1">
                        {property.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.units}</TableCell>
                  <TableCell>
                    <span className={getOccupancyColor(property.occupancyRate)}>
                      {property.occupancyRate}%
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(property.status)}</TableCell>
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
                        <DropdownMenuItem
                          onClick={() => handleViewProperty(property.id)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Property</DropdownMenuItem>
                        <DropdownMenuItem>Manage Units</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete Property
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No properties found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PropertyList;
