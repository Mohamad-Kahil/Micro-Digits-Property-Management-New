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
  FileText,
  Edit,
  Download,
  Printer,
  Building,
  FileType,
  HardDrive,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface Document {
  id: string;
  title: string;
  category: string;
  dateAdded: string;
  lastUpdated: string;
  property?: string;
  description?: string;
  fileUrl?: string;
  fileType: string;
  fileSize: string;
}

interface DocumentDetailsDialogProps {
  document: Document;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentDetailsDialog = ({
  document,
  isOpen,
  onClose,
}: DocumentDetailsDialogProps) => {
  const navigate = useNavigate();

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "deed":
        return <Badge className="bg-blue-100 text-blue-800">Deed</Badge>;
      case "permit":
        return <Badge className="bg-green-100 text-green-800">Permit</Badge>;
      case "certificate":
        return (
          <Badge className="bg-purple-100 text-purple-800">Certificate</Badge>
        );
      case "policy":
        return <Badge className="bg-amber-100 text-amber-800">Policy</Badge>;
      case "corporate":
        return <Badge className="bg-gray-100 text-gray-800">Corporate</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{category}</Badge>;
    }
  };

  const handleEdit = () => {
    onClose();
    navigate(`/legal/documents/${document.id}/edit`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">{document.title}</DialogTitle>
            {getCategoryBadge(document.category)}
          </div>
          <DialogDescription>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Added: {document.dateAdded} • Last Updated: {document.lastUpdated}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {document.description && (
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Description
              </Label>
              <div className="p-3 bg-muted/20 rounded-md">
                {document.description}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {document.property && (
              <div>
                <Label className="text-muted-foreground mb-1 block">
                  Related Property
                </Label>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{document.property}</span>
                </div>
              </div>
            )}
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Category
              </Label>
              <div className="font-medium capitalize">{document.category}</div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-muted-foreground mb-1 block">
                File Type
              </Label>
              <div className="flex items-center gap-2">
                <FileType className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{document.fileType}</span>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground mb-1 block">
                File Size
              </Label>
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{document.fileSize}</span>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground mb-1 block">
                Date Added
              </Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{document.dateAdded}</span>
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

export default DocumentDetailsDialog;
