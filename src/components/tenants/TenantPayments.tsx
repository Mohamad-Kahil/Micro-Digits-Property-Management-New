import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
        className="flex flex-col sm:flex-