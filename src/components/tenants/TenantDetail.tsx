import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Edit,
  Trash2,
  ChevronLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

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
  rentAmount: number;
  securityDeposit: number;
  moveInDate: string;
  documents: {
    id: string;
    name: string;
    type: string;
    date: string;
  }[];
  paymentHistory: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "late" | "failed";
    method: string;
  }[];
  communications: {
    id: string;
    date: string;
    type: "email" | "phone" | "in-person" | "sms";
    subject: string;
    summary: string;
    direction: "incoming" | "outgoing";
  }[];
  maintenanceRequests: {
    id: string;
    date: string;
    issue: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
  }[];
}

const mockTenants: Record<string, Tenant> = {
  "tenant-001": {
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
    rentAmount: 1500,
    securityDeposit: 1500,
    moveInDate: "2023-01-15",
    documents: [
      {
        id: "doc-1",
        name: "Lease Agreement.pdf",
        type: "Lease",
        date: "2023-01-10",
      },
      {
        id: "doc-2",
        name: "Move-in Inspection.pdf",
        type: "Inspection",
        date: "2023-01-15",
      },
      {
        id: "doc-3",
        name: "Renter's Insurance.pdf",
        type: "Insurance",
        date: "2023-01-12",
      },
    ],
    paymentHistory: [
      {
        id: "pay-1",
        date: "2023-06-01",
        amount: 1500,
        status: "paid",
        method: "Bank Transfer",
      },
      {
        id: "pay-2",
        date: "2023-05-01",
        amount: 1500,
        status: "paid",
        method: "Bank Transfer",
      },
      {
        id: "pay-3",
        date: "2023-04-01",
        amount: 1500,
        status: "paid",
        method: "Credit Card",
      },
      {
        id: "pay-4",
        date: "2023-03-03",
        amount: 1500,
        status: "late",
        method: "Bank Transfer",
      },
    ],
    communications: [
      {
        id: "comm-1",
        date: "2023-06-15",
        type: "email",
        subject: "Maintenance Request Follow-up",
        summary: "Followed up on the maintenance request for the kitchen sink.",
        direction: "outgoing",
      },
      {
        id: "comm-2",
        date: "2023-06-10",
        type: "phone",
        subject: "Lease Renewal Discussion",
        summary: "Discussed options for lease renewal starting in January.",
        direction: "incoming",
      },
      {
        id: "comm-3",
        date: "2023-05-22",
        type: "email",
        subject: "Building Maintenance Notice",
        summary:
          "Sent notice about upcoming water shut-off for building maintenance.",
        direction: "outgoing",
      },
    ],
    maintenanceRequests: [
      {
        id: "maint-1",
        date: "2023-06-08",
        issue: "Leaking kitchen sink",
        status: "completed",
        priority: "medium",
      },
      {
        id: "maint-2",
        date: "2023-04-15",
        issue: "Bathroom fan not working",
        status: "completed",
        priority: "low",
      },
      {
        id: "maint-3",
        date: "2023-02-28",
        issue: "Heater making noise",
        status: "completed",
        priority: "high",
      },
    ],
  },
  "tenant-002": {
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
    rentAmount: 1800,
    securityDeposit: 1800,
    moveInDate: "2023-03-01",
    documents: [
      {
        id: "doc-1",
        name: "Lease Agreement.pdf",
        type: "Lease",
        date: "2023-02-15",
      },
      {
        id: "doc-2",
        name: "Move-in Inspection.pdf",
        type: "Inspection",
        date: "2023-03-01",
      },
    ],
    paymentHistory: [
      {
        id: "pay-1",
        date: "2023-06-05",
        amount: 1800,
        status: "late",
        method: "Bank Transfer",
      },
      {
        id: "pay-2",
        date: "2023-05-01",
        amount: 1800,
        status: "paid",
        method: "Bank Transfer",
      },
    ],
    communications: [
      {
        id: "comm-1",
        date: "2023-06-03",
        type: "email",
        subject: "Late Payment Reminder",
        summary: "Sent reminder about June rent payment being due.",
        direction: "outgoing",
      },
    ],
    maintenanceRequests: [
      {
        id: "maint-1",
        date: "2023-05-10",
        issue: "Dishwasher not draining properly",
        status: "in-progress",
        priority: "medium",
      },
    ],
  },
};

const TenantDetail = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, you would fetch the tenant data based on the ID
  const tenant = tenantId ? mockTenants[tenantId] : null;

  if (!tenant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Tenant Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The tenant you're looking for doesn't exist.
          </p>
          <Button className="mt-4" onClick={() => navigate("/tenants")}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Tenants
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: Tenant["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Active
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80">
            Pending
          </Badge>
        );
      case "past":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100/80">
            Past Tenant
          </Badge>
        );
      case "notice":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100/80">
            Notice Given
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: Tenant["paymentStatus"]) => {
    switch (status) {
      case "current":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Current
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100/80">
            Late
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80">
            Overdue
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "late":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Calculate days left in lease
  const today = new Date();
  const leaseEnd = new Date(tenant.leaseEnd);
  const daysLeft = Math.ceil(
    (leaseEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  const leaseProgress = Math.max(
    0,
    Math.min(
      100,
      ((new Date().getTime() - new Date(tenant.leaseStart).getTime()) /
        (new Date(tenant.leaseEnd).getTime() -
          new Date(tenant.leaseStart).getTime())) *
        100,
    ),
  );

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
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        variants={itemVariants}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => navigate("/tenants")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
            {getStatusBadge(tenant.status)}
            {getPaymentStatusBadge(tenant.paymentStatus)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Mail className="h-4 w-4 mr-1" />
            {tenant.email} • <Phone className="h-4 w-4 mx-1" /> {tenant.phone}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/tenants/${tenant.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Tenant
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> End Lease
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Tenant Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Property/Unit
                    </CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium">{tenant.property}</div>
                    <div className="text-sm text-muted-foreground">
                      {tenant.unit}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Rent
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${tenant.rentAmount.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Lease Period
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-medium">
                      {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                      {new Date(tenant.leaseEnd).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {daysLeft > 0
                        ? `${daysLeft} days remaining`
                        : "Lease expired"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Security Deposit
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
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${tenant.securityDeposit.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lease Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Lease Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Start:{" "}
                        {new Date(tenant.leaseStart).toLocaleDateString()}
                      </span>
                      <span>
                        End: {new Date(tenant.leaseEnd).toLocaleDateString()}
                      </span>
                    </div>
                    <Progress value={leaseProgress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{Math.round(leaseProgress)}% complete</span>
                      <span>
                        {daysLeft > 0
                          ? `${daysLeft} days remaining`
                          : "Lease expired"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tenant Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Details */}
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {tenant.paymentHistory.slice(0, 1).map((payment) => (
                          <li
                            key={payment.id}
                            className="flex items-start gap-4"
                          >
                            <div className="bg-primary/10 p-2 rounded-full">
                              <DollarSign className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {payment.status === "paid"
                                  ? "Rent payment received"
                                  : "Rent payment due"}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ${payment.amount.toLocaleString()} -{" "}
                                {payment.method}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(payment.date).toLocaleDateString()}
                              </p>
                            </div>
                          </li>
                        ))}
                        {tenant.communications.slice(0, 1).map((comm) => (
                          <li key={comm.id} className="flex items-start gap-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <MessageSquare className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{comm.subject}</p>
                              <p className="text-sm text-muted-foreground">
                                {comm.summary}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comm.date).toLocaleDateString()}
                              </p>
                            </div>
                          </li>
                        ))}
                        {tenant.maintenanceRequests
                          .slice(0, 1)
                          .map((request) => (
                            <li
                              key={request.id}
                              className="flex items-start gap-4"
                            >
                              <div className="bg-primary/10 p-2 rounded-full">
                                <Wrench className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  Maintenance request: {request.status}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {request.issue}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(request.date).toLocaleDateString()}
                                </p>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Tenant Profile */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tenant Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={tenant.avatar} alt={tenant.name} />
                        <AvatarFallback>
                          {tenant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold">{tenant.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Tenant since{" "}
                        {new Date(tenant.moveInDate).toLocaleDateString()}
                      </p>
                      <div className="w-full space-y-2 text-left">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Email:
                          </span>
                          <span className="text-sm">{tenant.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Phone:
                          </span>
                          <span className="text-sm">{tenant.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Move-in Date:
                          </span>
                          <span className="text-sm">
                            {new Date(tenant.moveInDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {tenant.paymentHistory.map((payment, index) => (
                      <motion.div
                        key={payment.id}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            payment.status === "paid"
                              ? "bg-green-100"
                              : payment.status === "pending"
                                ? "bg-blue-100"
                                : payment.status === "late"
                                  ? "bg-amber-100"
                                  : "bg-red-100"
                          }`}
                        >
                          {getPaymentStatusIcon(payment.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                ${payment.amount.toLocaleString()} -{" "}
                                {payment.method}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(payment.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              className={`${
                                payment.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "pending"
                                    ? "bg-blue-100 text-blue-800"
                                    : payment.status === "late"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {payment.status.charAt(0).toUpperCase() +
                                payment.status.slice(1)}
                            </Badge>
                          </div>
                          <Separator className="my-4" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communications Tab */}
            <TabsContent value="communications">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Communication History</CardTitle>
                  <Button size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" /> New Message
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {tenant.communications.map((comm, index) => (
                      <motion.div
                        key={comm.id}
                        className="flex items-start gap-4"
                        initial={{
                          opacity: 0,
                          x: comm.direction === "incoming" ? -20 : 20,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            comm.direction === "incoming"
                              ? "bg-blue-100"
                              : "bg-green-100"
                          }`}
                        >
                          <MessageSquare
                            className={`h-4 w-4 ${
                              comm.direction === "incoming"
                                ? "text-blue-500"
                                : "text-green-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{comm.subject}</p>
                              <p className="text-sm">{comm.summary}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className="text-xs font-normal"
                                >
                                  {comm.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(comm.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <Badge
                              className={`${
                                comm.direction === "incoming"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {comm.direction === "incoming"
                                ? "Received"
                                : "Sent"}
                            </Badge>
                          </div>
                          <Separator className="my-4" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Maintenance Tab */}
            <TabsContent value="maintenance">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Maintenance Requests</CardTitle>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> New Request
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {tenant.maintenanceRequests.map((request, index) => (
                      <motion.div
                        key={request.id}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            request.status === "completed"
                              ? "bg-green-100"
                              : request.status === "in-progress"
                                ? "bg-blue-100"
                                : "bg-amber-100"
                          }`}
                        >
                          {request.status === "completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : request.status === "in-progress" ? (
                            <Clock className="h-4 w-4 text-blue-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{request.issue}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className={`${
                                    request.priority === "high"
                                      ? "border-red-200 text-red-700"
                                      : request.priority === "medium"
                                        ? "border-amber-200 text-amber-700"
                                        : "border-green-200 text-green-700"
                                  }`}
                                >
                                  {request.priority} priority
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(request.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <Badge
                              className={`${
                                request.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : request.status === "in-progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {request.status === "in-progress"
                                ? "In Progress"
                                : request.status.charAt(0).toUpperCase() +
                                  request.status.slice(1)}
                            </Badge>
                          </div>
                          <Separator className="my-4" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Tenant Documents</CardTitle>
                  <Button size="sm">
                    <FileText className="mr-2 h-4 w-4" /> Upload Document
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tenant.documents.map((doc, index) => (
                      <motion.div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                {doc.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(doc.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default TenantDetail;
