import React from "react";
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
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreVertical,
  FileText,
  Send,
} from "lucide-react";
import InvoiceDetailsDialog from "./InvoiceDetailsDialog";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  description: string;
  items?: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

interface UpcomingInvoicesProps {
  invoices?: Invoice[];
  className?: string;
  limit?: number;
}

const UpcomingInvoices = ({
  invoices = [
    {
      id: "INV-1001",
      invoiceNumber: "INV-2023-001",
      date: "2023-06-01",
      dueDate: "2023-06-15",
      clientName: "Sarah Johnson",
      amount: 1500,
      status: "sent",
      description: "Monthly rent for Unit 301 - June 2023",
    },
    {
      id: "INV-1002",
      invoiceNumber: "INV-2023-002",
      date: "2023-06-01",
      dueDate: "2023-06-15",
      clientName: "Michael Chen",
      amount: 1800,
      status: "paid",
      description: "Monthly rent for Unit 12B - June 2023",
    },
    {
      id: "INV-1003",
      invoiceNumber: "INV-2023-003",
      date: "2023-06-01",
      dueDate: "2023-06-15",
      clientName: "Emily Rodriguez",
      amount: 1650,
      status: "overdue",
      description: "Monthly rent for Unit 205 - June 2023",
    },
    {
      id: "INV-1004",
      invoiceNumber: "INV-2023-004",
      date: "2023-06-01",
      dueDate: "2023-06-15",
      clientName: "David Wilson",
      amount: 1550,
      status: "draft",
      description: "Monthly rent for Unit 112 - June 2023",
    },
    {
      id: "INV-1005",
      invoiceNumber: "INV-2023-005",
      date: "2023-06-01",
      dueDate: "2023-06-15",
      clientName: "Jessica Taylor",
      amount: 1750,
      status: "sent",
      description: "Monthly rent for Unit 8A - June 2023",
    },
  ],
  className,
  limit,
}: UpcomingInvoicesProps) => {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(
    null,
  );

  // Limit the number of invoices if specified
  const displayedInvoices = limit ? invoices.slice(0, limit) : invoices;

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailsOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <Clock className="h-4 w-4 text-gray-500" />;
      case "sent":
        return <Send className="h-4 w-4 text-blue-500" />;
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "sent":
        return <Badge className="bg-blue-100 text-blue-800">Sent</Badge>;
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div
      className={cn(
        "bg-card rounded-lg border shadow-sm table-container",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Upcoming Invoices</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/finance/invoices")}
          type="button"
        >
          View All
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell>{invoice.clientName}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>${invoice.amount.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(invoice.status)}
                  {getStatusBadge(invoice.status)}
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
                      onClick={() => handleViewDetails(invoice)}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(`/finance/invoices/${invoice.id}/edit`)
                      }
                    >
                      Edit Invoice
                    </DropdownMenuItem>
                    {invoice.status === "draft" && (
                      <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                    )}
                    {invoice.status === "sent" && (
                      <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <InvoiceDetailsDialog
          invoice={selectedInvoice}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default UpcomingInvoices;
