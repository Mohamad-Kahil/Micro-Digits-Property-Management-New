import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  User,
  FileText,
  Edit,
  Download,
  Printer,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  description: string;
  items?: InvoiceItem[];
}

interface InvoiceDetailsDialogProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceDetailsDialog = ({
  invoice,
  isOpen,
  onClose,
}: InvoiceDetailsDialogProps) => {
  // Mock invoice items if not provided
  const invoiceItems = invoice.items || [
    {
      id: "item-1",
      description: "Monthly Rent",
      quantity: 1,
      unitPrice: invoice.amount,
      total: invoice.amount,
    },
  ];

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">
              Invoice {invoice.invoiceNumber}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(invoice.status)}
              {getStatusBadge(invoice.status)}
            </div>
          </div>
          <DialogDescription>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Date: {invoice.date} • Due: {invoice.dueDate}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground mb-1 block">Client</Label>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{invoice.clientName}</span>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Description
              </Label>
              <div className="font-medium">{invoice.description}</div>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-muted-foreground mb-2 block">
              Invoice Items
            </Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.unitPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.total.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3 space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal:</span>
                <span>${invoice.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tax:</span>
                <span>$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${invoice.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose} type="button">
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" type="button">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" type="button">
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            {invoice.status === "draft" && (
              <Button type="button">
                <Send className="mr-2 h-4 w-4" /> Send
              </Button>
            )}
            {invoice.status === "sent" && (
              <Button type="button">
                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Paid
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetailsDialog;
