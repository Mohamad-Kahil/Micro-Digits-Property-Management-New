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
  DollarSign,
  Tag,
  CreditCard,
  FileText,
  ArrowUpCircle,
  ArrowDownCircle,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  account: string;
  reference?: string;
  notes?: string;
}

interface TransactionDetailsDialogProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionDetailsDialog = ({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">Transaction Details</DialogTitle>
            <Badge
              className={
                transaction.type === "income"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {transaction.type === "income" ? "Income" : "Expense"}
            </Badge>
          </div>
          <DialogDescription>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {transaction.date} • ID: {transaction.id}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <Label className="text-muted-foreground">Amount</Label>
            <div className="flex items-center gap-2 text-xl font-bold">
              {transaction.type === "income" ? (
                <ArrowUpCircle className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDownCircle className="h-5 w-5 text-red-500" />
              )}
              <span
                className={
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                ${transaction.amount.toLocaleString()}
              </span>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Description
              </Label>
              <div className="font-medium">{transaction.description}</div>
            </div>
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Category
              </Label>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{transaction.category}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Account
              </Label>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{transaction.account}</span>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Reference
              </Label>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {transaction.reference || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {transaction.notes && (
            <div>
              <Label className="text-muted-foreground mb-1 block">Notes</Label>
              <div className="p-3 bg-muted/20 rounded-md">
                {transaction.notes}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose} type="button">
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" type="button">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button type="button">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsDialog;
