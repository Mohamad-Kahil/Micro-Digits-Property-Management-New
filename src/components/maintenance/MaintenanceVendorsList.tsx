import React from "react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MoreHorizontal, Building, Star } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  rating: number;
  activeContracts: number;
  lastUsed?: string;
}

interface MaintenanceVendorsListProps {
  limit?: number;
  searchQuery?: string;
}

const mockVendors: Vendor[] = [
  {
    id: "vendor-001",
    name: "Electric Experts LLC",
    category: "Electrical",
    contactName: "Robert Johnson",
    phone: "(555) 123-4567",
    email: "info@electricexperts.com",
    address: "123 Main St, Anytown, CA 90210",
    rating: 4.8,
    activeContracts: 3,
    lastUsed: "2023-06-15",
  },
  {
    id: "vendor-002",
    name: "Plumbing Pros",
    category: "Plumbing",
    contactName: "Sarah Miller",
    phone: "(555) 234-5678",
    email: "contact@plumbingpros.com",
    address: "456 Oak Ave, Somewhere, CA 90211",
    rating: 4.5,
    activeContracts: 2,
    lastUsed: "2023-06-10",
  },
  {
    id: "vendor-003",
    name: "HVAC Solutions",
    category: "HVAC",
    contactName: "Michael Davis",
    phone: "(555) 345-6789",
    email: "service@hvacsolutions.com",
    address: "789 Pine St, Nowhere, CA 90212",
    rating: 4.9,
    activeContracts: 4,
    lastUsed: "2023-06-12",
  },
  {
    id: "vendor-004",
    name: "Pest Solutions Inc.",
    category: "Pest Control",
    contactName: "Jennifer Lopez",
    phone: "(555) 456-7890",
    email: "info@pestsolutions.com",
    address: "101 Elm St, Elsewhere, CA 90213",
    rating: 4.2,
    activeContracts: 1,
    lastUsed: "2023-05-28",
  },
  {
    id: "vendor-005",
    name: "Locksmith Masters",
    category: "Security",
    contactName: "David Brown",
    phone: "(555) 567-8901",
    email: "info@lockmasters.com",
    address: "202 Security Ave, Somewhere, CA 90214",
    rating: 4.7,
    activeContracts: 2,
    lastUsed: "2023-06-01",
  },
];

const MaintenanceVendorsList = ({
  limit,
  searchQuery = "",
}: MaintenanceVendorsListProps) => {
  const navigate = useNavigate();

  // Filter vendors based on search query
  const filteredVendors = mockVendors.filter((vendor) => {
    return (
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.phone.includes(searchQuery)
    );
  });

  // Limit the number of vendors if specified
  const displayedVendors = limit
    ? filteredVendors.slice(0, limit)
    : filteredVendors;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Vendors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Active Contracts</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedVendors.length > 0 ? (
              displayedVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div>{vendor.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="text-sm">{vendor.contactName}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{vendor.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{vendor.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="ml-1">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.activeContracts}</TableCell>
                  <TableCell>
                    {vendor.lastUsed
                      ? new Date(vendor.lastUsed).toLocaleDateString()
                      : "Never"}
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
                        <DropdownMenuItem>Edit Vendor</DropdownMenuItem>
                        <DropdownMenuItem>Contact Vendor</DropdownMenuItem>
                        <DropdownMenuItem>View Contracts</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No vendors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {limit && displayedVendors.length > 0 && (
          <div className="mt-4">
            <Button
              variant="link"
              className="w-full"
              onClick={() => navigate("/maintenance/vendors")}
            >
              View All Vendors
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceVendorsList;
