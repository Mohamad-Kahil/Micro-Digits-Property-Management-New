import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  DollarSign,
  Plus,
  Calendar,
  CreditCard,
  Download,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Payment {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "late" | "failed";
  method: string;
  reference?: string;
  notes?: string;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  property: string;
  unit: string;
  rentAmount: number;
  avatar: string;
  paymentHistory: Payment[];
}

const mockTenants: Record<string, Tenant> = {
  "tenant-001": {
    id: "tenant-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    property: "Sunset Apartments",
    unit: "Apt 301",
    rentAmount: 1500,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-johnson",
    paymentHistory: [
      {
        id: "pay-1",
        date: "2023-06-01",
        dueDate: "2023-06-01",
        amount: 1500,
        status: "paid",
        method: "Bank Transfer",
        reference: "REF123456",
        notes: "Rent for June 2023",
      },
      {
        id: "pay-2",
        date: "2023-05-01",
        dueDate: "2023-05-01",
        amount: 1500,
        status: "paid",
        method: "Bank Transfer",
        reference: "REF123455",
        notes: "Rent for May 2023",
      },
      {
        id: "pay-3",
        date: "2023-04-01",
        dueDate: "2023-04-01",
        amount: 1500,
        status: "paid",
        method: "Credit Card",
        reference: "REF123454",
        notes: "Rent for April 2023",
      },
      {
        id: "pay-4",
        date: "2023-03-03",
        dueDate: "2023-03-01",
        amount: 1500,
        status: "late",
        method: "Bank Transfer",
        reference: "REF123453",
        notes: "Rent for March 2023 - paid 2 days late",
      },
      {
        id: "pay-5",
        date: "2023-02-01",
        dueDate: "2023-02-01",
        amount: 1500,
        status: "paid",
        method: "Bank Transfer",
        reference: "REF123452",
        notes: "Rent for February 2023",
      },
      {
        id: "pay-6",
        date: "2023-01-01",
        dueDate: "2023-01-01",
        amount: 1500,
        status: "paid",
        method: "Bank Transfer",
        reference: "REF123451",
        notes: "Rent for January 2023",
      },
      {
        id: "pay-7",
        date: "",
        dueDate: "2023-07-01",
        amount: 1500,
        status: "pending",
        method: "",
        notes: "Upcoming rent for July 2023",
      },
    ],
  },
  "tenant-002": {
    id: "tenant-002",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    property: "Parkview Residences",
    unit: "Unit 12B",
    rentAmount: 1800,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-chen",
    paymentHistory: [
      {
        id: "pay-1",
        date: "2023-06-05",
        dueDate: "2023-06-01",
        amount: 1800,
        status: "late",
        method: "Bank Transfer",
        reference: "REF789012",
        notes: "Rent for June 2023 - paid 4 days late",
      },
      {
        id: "pay-2",
        date: "2023-05-01",
        dueDate: "2023-05-01",
        amount: 1800,
        status: "paid",
        method: "Bank Transfer",
        reference: "REF789011",
        notes: "Rent for May 2023",
      },
      {
        id: "pay-3",
        date: "2023-04-01",
        dueDate: "2023-04-01",
        amount: 1800,
        status: "paid",
        method: "Credit Card",
        reference: "REF789010",
        notes: "Rent for April 2023",
      },
      {
        id: "pay-4",
        date: "2023-03-01",
        dueDate: "2023-03-01",
        amount: 1800,
        status: "paid",
        method: "Bank Transfer",
        reference: "REF789009",
        notes: "Rent for March 2023",
      },
      {
        id: "pay-5",
        date: "",
        dueDate: "2023-07-01",
        amount: 1800,
        status: "pending",
        method: "",
        notes: "Upcoming rent for July 2023",
      },
    ],
  },
};

const TenantPayments = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    method: "bank_transfer",
    reference: "",
    notes: "",
  });

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

  const getStatusIcon = (status: Payment["status"]) => {
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

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80">
            Pending
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100/80">
            Late
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80">
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAddPayment = () => {
    console.log("Adding payment:", newPayment);
    setIsAddPaymentOpen(false);
    // In a real app, you would save the payment to your backend
  };

  // Filter payments based on search query and status filter
  const filteredPayments = tenant.paymentHistory.filter((payment) => {
    const matchesSearch =
      payment.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;

    const matchesStatus = statusFilter ? payment.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // Calculate payment stats
  const paidPayments = tenant.paymentHistory.filter(
    (p) => p.status === "paid",
  ).length;
  const latePayments = tenant.paymentHistory.filter(
    (p) => p.status === "late",
  ).length;
  const pendingPayments = tenant.paymentHistory.filter(
    (p) => p.status === "pending",
  ).length;
  const totalPaid = tenant.paymentHistory
    .filter((p) => p.status === "paid" || p.status === "late")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => navigate(`/tenants/${tenant.id}`)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Payment History
            </h1>
          </div>
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-1" />
            Monthly Rent: ${tenant.rentAmount.toLocaleString()} •{" "}
            <Calendar className="h-4 w-4 mx-1" /> Due on the 1st
          </div>
        </div>
        <Dialog open={isAddPaymentOpen} onOpenChange={setIsAddPaymentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
              <DialogDescription>
                Add a new payment record for this tenant.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount ($)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Payment Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="method" className="text-right">
                  Method
                </Label>
                <Select
                  value={newPayment.method}
                  onValueChange={(value) =>
                    setNewPayment({ ...newPayment, method: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reference" className="text-right">
                  Reference
                </Label>
                <Input
                  id="reference"
                  value={newPayment.reference}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, reference: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Transaction ID, Check #, etc."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Input
                  id="notes"
                  value={newPayment.notes}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, notes: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="e.g. Rent for July 2023"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddPayment}>
                <DollarSign className="mr-2 h-4 w-4" /> Record Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPaid.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              On-Time Payments
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {paidPayments}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Late Payments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {latePayments}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {pendingPayments}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search payments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter || ""}
          onValueChange={(value) => setStatusFilter(value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="late">Late</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <div key={payment.id} className="flex items-start gap-4">
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
                    {getStatusIcon(payment.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          ${payment.amount.toLocaleString()}
                          {payment.notes && ` - ${payment.notes}`}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {payment.method && (
                            <Badge
                              variant="outline"
                              className="flex items-center gap-1 text-xs font-normal"
                            >
                              <CreditCard className="h-3 w-3" />
                              <span>
                                {payment.method
                                  .replace("_", " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                            </Badge>
                          )}
                          {payment.reference && (
                            <span className="text-xs text-muted-foreground">
                              Ref: {payment.reference}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {getStatusBadge(payment.status)}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {payment.date
                              ? `Paid: ${new Date(payment.date).toLocaleDateString()}`
                              : `Due: ${new Date(payment.dueDate).toLocaleDateString()}`}
                          </span>
                          {payment.status !== "pending" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No payments found</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {searchQuery || statusFilter
                    ? "Try adjusting your search or filter"
                    : "No payment records found for this tenant"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantPayments;
