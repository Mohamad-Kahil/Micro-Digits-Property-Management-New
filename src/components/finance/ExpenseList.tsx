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
import { MoreVertical, CreditCard, Receipt, FileText } from "lucide-react";
import TransactionDetailsDialog from "./TransactionDetailsDialog";

interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  property?: string;
  unit?: string;
  vendor?: string;
  paymentMethod: string;
  reference?: string;
  notes?: string;
  receiptUrl?: string;
}

interface ExpenseListProps {
  expenses?: Expense[];
  className?: string;
  searchQuery?: string;
  categoryFilter?: string | null;
  dateRange?: { from: Date; to: Date };
}

const ExpenseList = ({
  expenses = [
    {
      id: "EXP-1001",
      date: "2023-06-15",
      description: "Plumbing Repair - Unit 103",
      amount: 350,
      category: "Maintenance",
      property: "Sunset Heights",
      unit: "103",
      vendor: "Plumbing Pros",
      paymentMethod: "Credit Card",
      reference: "INV789012",
    },
    {
      id: "EXP-1002",
      date: "2023-06-10",
      description: "Property Insurance",
      amount: 1200,
      category: "Insurance",
      property: "All Properties",
      vendor: "SafeGuard Insurance",
      paymentMethod: "Bank Transfer",
      reference: "INS456789",
    },
    {
      id: "EXP-1003",
      date: "2023-06-08",
      description: "Utility Bill - Water",
      amount: 450,
      category: "Utilities",
      property: "Oakwood Apartments",
      vendor: "City Water Services",
      paymentMethod: "Bank Transfer",
      reference: "UTIL123456",
    },
    {
      id: "EXP-1004",
      date: "2023-06-05",
      description: "Landscaping Services",
      amount: 800,
      category: "Maintenance",
      property: "All Properties",
      vendor: "Green Thumb Services",
      paymentMethod: "Credit Card",
      reference: "INV567890",
    },
    {
      id: "EXP-1005",
      date: "2023-06-01",
      description: "Property Management Fee",
      amount: 2500,
      category: "Management",
      property: "All Properties",
      vendor: "Micro Digits Property Management",
      paymentMethod: "Bank Transfer",
      reference: "FEE123456",
    },
  ],
  className,
  searchQuery = "",
  categoryFilter = null,
  dateRange,
}: ExpenseListProps) => {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedExpense, setSelectedExpense] = React.useState<Expense | null>(
    null,
  );

  // Filter expenses based on search query, category, and date range
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.property?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter
      ? expense.category.toLowerCase() === categoryFilter.toLowerCase()
      : true;

    const expenseDate = new Date(expense.date);
    const matchesDateRange = dateRange
      ? (dateRange.from ? expenseDate >= dateRange.from : true) &&
        (dateRange.to ? expenseDate <= dateRange.to : true)
      : true;

    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const handleViewDetails = (expense: Expense) => {
    // Convert expense to transaction format for the dialog
    const transaction = {
      id: expense.id,
      date: expense.date,
      description: expense.description,
      amount: expense.amount,
      type: "expense" as const,
      category: expense.category,
      account: expense.paymentMethod,
      reference: expense.reference,
      notes: expense.notes,
    };

    setSelectedExpense(expense);
    setIsDetailsOpen(true);
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
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Expense Transactions</h3>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.date}</TableCell>
                <TableCell className="font-medium">
                  {expense.description}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{expense.category}</Badge>
                </TableCell>
                <TableCell>{expense.property || "N/A"}</TableCell>
                <TableCell>{expense.vendor || "N/A"}</TableCell>
                <TableCell className="text-red-600">
                  ${expense.amount.toLocaleString()}
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
                        onClick={() => handleViewDetails(expense)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/finance/expenses/${expense.id}/edit`)
                        }
                      >
                        Edit Expense
                      </DropdownMenuItem>
                      {expense.receiptUrl && (
                        <DropdownMenuItem>View Receipt</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No expenses found matching your criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Expense Details Dialog */}
      {selectedExpense && (
        <TransactionDetailsDialog
          transaction={{
            id: selectedExpense.id,
            date: selectedExpense.date,
            description: selectedExpense.description,
            amount: selectedExpense.amount,
            type: "expense",
            category: selectedExpense.category,
            account: selectedExpense.paymentMethod,
            reference: selectedExpense.reference,
            notes: selectedExpense.notes,
          }}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default ExpenseList;
