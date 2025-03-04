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
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Edit,
  Building,
  User,
  Scale,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface ComplianceItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
  property?: string;
  assignedTo?: string;
  description?: string;
}

interface ComplianceDetailsDialogProps {
  item: ComplianceItem;
  isOpen: boolean;
  onClose: () => void;
}

const ComplianceDetailsDialog = ({
  item,
  isOpen,
  onClose,
}: ComplianceDetailsDialogProps) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const handleEdit = () => {
    onClose();
    navigate(`/legal/compliance/${item.id}/edit`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">{item.title}</DialogTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(item.status)}
              {getStatusBadge(item.status)}
            </div>
          </div>
          <DialogDescription>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Due Date: {item.dueDate}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {item.description && (
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Description
              </Label>
              <div className="p-3 bg-muted/20 rounded-md">
                {item.description}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Category
              </Label>
              <div className="font-medium capitalize">{item.category}</div>
            </div>
            {item.property && (
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  Related Property
                </Label>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.property}</span>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <Label className="text-muted-foreground mb-1 block">
              Assignment
            </Label>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {item.assignedTo || "Unassigned"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose} type="button">
            Close
          </Button>
          <div className="flex gap-2">
            {item.status !== "completed" ? (
              <Button variant="outline" type="button">
                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
              </Button>
            ) : (
              <Button variant="outline" type="button">
                <Clock className="mr-2 h-4 w-4" /> Mark as Pending
              </Button>
            )}
            <Button onClick={handleEdit} type="button">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComplianceDetailsDialog;
