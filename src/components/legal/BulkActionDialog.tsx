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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCheck, AlertTriangle } from "lucide-react";

interface BulkActionItem {
  id: string;
  title: string;
  status?: string;
  type?: string;
}

interface BulkActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (ids: string[], action: string) => void;
  items: BulkActionItem[];
  actionType: "status" | "renewal" | "export" | "delete";
  title?: string;
  description?: string;
}

const BulkActionDialog = ({
  isOpen,
  onClose,
  onAction,
  items,
  actionType,
  title = "Bulk Action",
  description = "Select items to perform bulk action.",
}: BulkActionDialogProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
      setSelectAll(false);
    } else {
      setSelectedIds([...selectedIds, id]);
      if (selectedIds.length + 1 === items.length) {
        setSelectAll(true);
      }
    }
  };

  const getActionButton = () => {
    switch (actionType) {
      case "status":
        return (
          <Button
            onClick={() => onAction(selectedIds, "complete")}
            type="button"
            disabled={selectedIds.length === 0}
          >
            <CheckCheck className="mr-2 h-4 w-4" /> Mark as Completed
          </Button>
        );
      case "renewal":
        return (
          <Button
            onClick={() => onAction(selectedIds, "renew")}
            type="button"
            disabled={selectedIds.length === 0}
          >
            <Calendar className="mr-2 h-4 w-4" /> Renew Selected
          </Button>
        );
      case "export":
        return (
          <Button
            onClick={() => onAction(selectedIds, "export")}
            type="button"
            disabled={selectedIds.length === 0}
          >
            <Download className="mr-2 h-4 w-4" /> Export Selected
          </Button>
        );
      case "delete":
        return (
          <Button
            variant="destructive"
            onClick={() => onAction(selectedIds, "delete")}
            type="button"
            disabled={selectedIds.length === 0}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
        );
      default:
        return (
          <Button
            onClick={() => onAction(selectedIds, "process")}
            type="button"
            disabled={selectedIds.length === 0}
          >
            Process Selected
          </Button>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all">Select All ({items.length})</Label>
          </div>

          <Separator />

          <div className="space-y-2 max-h-[300px] overflow-y-auto p-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 p-2 border rounded-md"
              >
                <Checkbox
                  id={`item-${item.id}`}
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                />
                <Label htmlFor={`item-${item.id}`} className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  {item.status && (
                    <div className="text-xs text-muted-foreground">
                      Status: {item.status}
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </div>

          {selectedIds.length > 0 && (
            <div className="bg-muted/20 p-2 rounded-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <p className="text-sm">
                  {selectedIds.length}{" "}
                  {selectedIds.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          {getActionButton()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { Calendar, Download, Trash } from "lucide-react";

export default BulkActionDialog;
