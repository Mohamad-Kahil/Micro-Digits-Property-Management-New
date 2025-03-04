import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Phone,
  Home,
  Calendar,
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

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  status: "active" | "pending" | "past" | "notice";
  paymentStatus: "current" | "late" | "overdue";
  avatar: string;
}

const mockTenants: Tenant[] = [
  {
    id: "tenant-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    property: "Sunset Apartments",
    unit: "Apt 301",
    leaseStart: "2023-01-15",
    leaseEnd: "2024-01-14",
    status: "active",
    paymentStatus: "current",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-johnson",
  },
  {
    id: "tenant-002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 987-6543",
    property: "Parkview Residences",
    unit: "Unit 12B",
    leaseStart: "2023-03-01",
    leaseEnd: "2024-02-29",
    status: "active",
    paymentStatus: "late",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-chen",
  },
  {
    id: "tenant-003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "(555) 234-5678",
    property: "Highland Towers",
    unit: "Suite 205",
    leaseStart: "2022-11-01",
    leaseEnd: "2023-10-31",
    status: "notice",
    paymentStatus: "current",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily-rodriguez",
  },
  {
    id: "tenant-004",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "(555) 345-6789",
    property: "Sunset Apartments",
    unit: "Apt 112",
    leaseStart: "2023-05-15",
    leaseEnd: "2024-05-14",
    status: "active",
    paymentStatus: "current",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david-wilson",
  },
  {
    id: "tenant-005",
    name: "Jessica Taylor",
    email: "jessica.taylor@example.com",
    phone: "(555) 456-7890",
    property: "Parkview Residences",
    unit: "Unit 8A",
    leaseStart: "2023-02-01",
    leaseEnd: "2023-07-31",
    status: "past",
    paymentStatus: "current",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica-taylor",
  },
  {
    id: "tenant-006",
    name: "Robert Martinez",
    email: "robert.martinez@example.com",
    phone: "(555) 567-8901",
    property: "Highland Towers",
    unit: "Suite 310",
    leaseStart: "2023-07-01",
    leaseEnd: "2024-06-30",
    status: "active",
    paymentStatus: "overdue",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert-martinez",
  },
  {
    id: "tenant-007",
    name: "Amanda Lee",
    email: "amanda.lee@example.com",
    phone: "(555) 678-9012",
    property: "Metro Lofts",
    unit: "Loft 3",
    leaseStart: "2023-08-15",
    leaseEnd: "2024-08-14",
    status: "pending",
    paymentStatus: "current",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda-lee",
  },
];

const TenantList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const navigate = useNavigate();

  const handleViewTenant = (tenantId: string) => {
    navigate(`/tenants/${tenantId}`);
  };

  const getStatusBadge = (status: Tenant["status"]) => {
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
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Pending
          </Badge>
        );
      case "past":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Past Tenant
          </Badge>
        );
      case "notice":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Notice Given
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: Tenant["paymentStatus"]) => {
    switch (status) {
      case "current":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Current
          </Badge>
        );
      case "late":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Late
          </Badge>
        );
      case "overdue":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate stats
  const activeTenants = tenants.filter((t) => t.status === "active").length;
  const pendingTenants = tenants.filter((t) => t.status === "pending").length;
  const tenantsWithNotice = tenants.filter((t) => t.status === "notice").length;
  const overduePayments = tenants.filter(
    (t) => t.paymentStatus === "overdue",
  ).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground mt-2">
            Manage your tenants, leases, and communications.
          </p>
        </div>
        <Button onClick={() => navigate("/tenants/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </div>

      {/* Tenant Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Tenants
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTenants}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Move-ins
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTenants}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Notice Given
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tenantsWithNotice}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Payments
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {overduePayments}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tenants..."
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

      {/* Tenants Table */}
      <div className="rounded-md border table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div className="flex items-center gap-1">
                  Tenant
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Property/Unit</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Lease End
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.length > 0 ? (
              filteredTenants.map((tenant, index) => (
                <motion.tr
                  key={tenant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={tenant.avatar}
                        alt={tenant.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <div>{tenant.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{tenant.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {tenant.property}
                      <div className="text-xs text-muted-foreground">
                        {tenant.unit}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(tenant.leaseEnd).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell>
                    {getPaymentStatusBadge(tenant.paymentStatus)}
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
                        <DropdownMenuItem
                          onClick={() => handleViewTenant(tenant.id)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate(`/tenants/${tenant.id}/edit`)}
                        >
                          Edit Tenant
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/tenants/${tenant.id}/payments`)
                          }
                        >
                          Payment History
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/tenants/${tenant.id}/communication`)
                          }
                        >
                          Communication Log
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          End Lease
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No tenants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default TenantList;
