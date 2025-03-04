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
  ArrowDownCircle,
  ArrowUpCircle,
  MoreVertical,
  DollarSign,
} from "lucide-react";
import TransactionDetailsDialog from "./TransactionDetailsDialog";

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

interface RecentTransactionsProps {
  transactions?: Transaction[];
  className?: string;
  limit?: number;
}

const RecentTransactions = ({
  transactions = [
    {
      id: "TX-1001",
      date: "2023-06-15",
      description: "Rent Payment - Unit 301",
      amount: 1500,
      type: "income",
      category: "Rent",
      account: "Main Account",
      reference: "REF123456",
    },
    {
      id: "TX-1002",
      date: "2023-06-14",
      description: "Plumbing Repair - Unit 103",
      amount: 350,
      type: "expense",
      category: "Maintenance",
      account: "Main Account",
      reference: "INV789012",
    },
    {
      id: "TX-1003",
      date: "2023-06-12",
      description: "Rent Payment - Unit 205",
      amount: 1800,
      type: "income",
      category: "Rent",
      account: "Main Account",
      reference: "REF789012",
    },
    {
      id: "TX-1004",
      date: "2023-06-10",
      description: "Property Insurance",
      amount: 1200,
      type: "expense",
      category: "Insurance",
      account: "Main Account",
      reference: "INS456789",
    },
    {
      id: "TX-1005",
      date: "2023-06-08",
      description: "Utility Bill - Water",
      amount: 450,
      type: "expense",
      category: "Utilities",
      account: "Main Account",
      reference: "UTIL123456",
    },
  ],
  className,
  limit,
}: RecentTransactionsProps) => {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    React.useState<Transaction | null>(null);

  // Limit the number of transactions if specified
  const displayedTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
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
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Recent Transactions</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/finance/transactions")}
          type="button"
        >
          View All
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell className="font-medium">
                {transaction.description}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{transaction.category}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {transaction.type === "income" ? (
                    <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-red-500" />
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
                      onClick={() => handleViewDetails(transaction)}
                    >
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(`/finance/transactions/${transaction.id}/edit`)
                      }
                    >
                      Edit Transaction
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Transaction Details Dialog */}
      {selectedTransaction && (
        <TransactionDetailsDialog
          transaction={selectedTransaction}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default RecentTransactions;
