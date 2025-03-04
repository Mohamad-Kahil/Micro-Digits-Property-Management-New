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
  FileCheck,
  Clock,
  AlertTriangle,
  FileText,
  Edit,
  Download,
  Printer,
  Building,
  DollarSign,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface Contract {
  id: string;
  title: string;
  type: string;
  status: "active" | "expiring" | "expired" | "draft";
  startDate: string;
  endDate: string;
  parties: string[];
  value?: number;
  property?: string;
  description?: string;
  fileUrl?: string;
}

interface ContractDetailsDialogProps {
  contract: Contract;
  isOpen: boolean;
  onClose: () => void;
}

const ContractDetailsDialog = ({
  contract,
  isOpen,
  onClose,
}: ContractDetailsDialogProps) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "expiring":
        return (
          <Badge className="bg-amber-100 text-amber-800">Expiring Soon</Badge>
        );
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case "expiring":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "draft":
        return <FileText className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const handleEdit = () => {
    onClose();
    navigate(`/legal/contracts/${contract.id}/edit`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">{contract.title}</DialogTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon(contract.status)}
              {getStatusBadge(contract.status)}
            </div>
          </div>
          <DialogDescription>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Valid from {contract.startDate} to {contract.endDate}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Contract Type
              </Label>
              <div className="font-medium capitalize">{contract.type}</div>
            </div>
            {contract.value && (
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  Contract Value
                </Label>
                <div className="font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                  {contract.value.toLocaleString()}
                </div>
              </div>
            )}
          </div>

          <div>
            <Label className="text-muted-foreground mb-1 block">Parties</Label>
            <div className="space-y-2">
              {contract.parties.map((party, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{party}</span>
                </div>
              ))}
            </div>
          </div>

          {contract.property && (
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Related Property
              </Label>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{contract.property}</span>
              </div>
            </div>
          )}

          {contract.description && (
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Description
              </Label>
              <div className="p-3 bg-muted/20 rounded-md">
                {contract.description}
              </div>
            </div>
          )}

          <div>
            <Label className="text-muted-foreground mb-1 block">
              Key Dates
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Start Date</div>
                <div className="font-medium">{contract.startDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">End Date</div>
                <div className="font-medium">{contract.endDate}</div>
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
            <Button onClick={handleEdit} type="button">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDetailsDialog;
