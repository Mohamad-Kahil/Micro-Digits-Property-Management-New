import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock } from "lucide-react";
import { addYears, format } from "date-fns";

interface RenewContractDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRenew: (startDate: string, endDate: string) => void;
  currentEndDate: string;
}

const RenewContractDialog = ({
  isOpen,
  onClose,
  onRenew,
  currentEndDate,
}: RenewContractDialogProps) => {
  // Default new start date is the day after current end date
  const defaultStartDate = new Date(currentEndDate);
  defaultStartDate.setDate(defaultStartDate.getDate() + 1);

  // Default new end date is one year after new start date
  const defaultEndDate = addYears(defaultStartDate, 1);

  const [startDate, setStartDate] = useState(
    format(defaultStartDate, "yyyy-MM-dd"),
  );
  const [endDate, setEndDate] = useState(format(defaultEndDate, "yyyy-MM-dd"));

  const handleSubmit = () => {
    onRenew(startDate, endDate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Renew Contract</DialogTitle>
          <DialogDescription>
            Set the new contract period for the renewal.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">New Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="start-date"
                type="date"
                className="pl-10"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">New End Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="end-date"
                type="date"
                className="pl-10"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="button">
            <Clock className="mr-2 h-4 w-4" /> Renew Contract
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenewContractDialog;
