import React from "react";
import { CalendarClock, ArrowUpDown, MoreHorizontal } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Tenant {
  id: string;
  name: string;
  unit: string;
  property: string;
  renewalDate: Date;
  status: "upcoming" | "due" | "overdue" | "renewed";
}

interface LeaseRenewalsTableProps {
  renewals?: Tenant[];
  className?: string;
}

const LeaseRenewalsTable = ({
  renewals = [
    {
      id: "1",
      name: "Sarah Johnson",
      unit: "Apt 301",
      property: "Sunset Apartments",
      renewalDate: new Date(2023, 6, 15),
      status: "upcoming",
    },
    {
      id: "2",
      name: "Michael Chen",
      unit: "Unit 12B",
      property: "Parkview Residences",
      renewalDate: new Date(2023, 5, 30),
      status: "due",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      unit: "Suite 205",
      property: "Highland Towers",
      renewalDate: new Date(2023, 5, 10),
      status: "overdue",
    },
    {
      id: "4",
      name: "David Wilson",
      unit: "Apt 112",
      property: "Sunset Apartments",
      renewalDate: new Date(2023, 7, 22),
      status: "upcoming",
    },
    {
      id: "5",
      name: "Jessica Taylor",
      unit: "Unit 8A",
      property: "Parkview Residences",
      renewalDate: new Date(2023, 5, 25),
      status: "renewed",
    },
  ],
  className,
}: LeaseRenewalsTableProps) => {
  const getStatusColor = (status: Tenant["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case "due":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
      case "overdue":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      case "renewed":
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      default:
        return "";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getDaysRemaining = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
          <CalendarClock className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Upcoming Lease Renewals</h3>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Property/Unit
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Renewal Date
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {renewals.map((renewal) => (
            <TableRow key={renewal.id}>
              <TableCell className="font-medium">{renewal.name}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{renewal.property}</span>
                  <span className="text-xs text-muted-foreground">
                    {renewal.unit}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{formatDate(renewal.renewalDate)}</span>
                  <span className="text-xs text-muted-foreground">
                    {getDaysRemaining(renewal.renewalDate) > 0
                      ? `${getDaysRemaining(renewal.renewalDate)} days remaining`
                      : getDaysRemaining(renewal.renewalDate) === 0
                        ? "Due today"
                        : `${Math.abs(getDaysRemaining(renewal.renewalDate))} days overdue`}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(getStatusColor(renewal.status))}
                >
                  {renewal.status.charAt(0).toUpperCase() +
                    renewal.status.slice(1)}
                </Badge>
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
                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                    <DropdownMenuItem>Mark as Renewed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaseRenewalsTable;
