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
import { FileUp, Upload } from "lucide-react";

interface UploadDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  title?: string;
  description?: string;
  acceptedFileTypes?: string;
}

const UploadDocumentDialog = ({
  isOpen,
  onClose,
  onUpload,
  title = "Upload Document",
  description = "Upload a document file.",
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.png",
}: UploadDocumentDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="document-upload">Document File</Label>
            <Input
              id="document-upload"
              type="file"
              accept={acceptedFileTypes}
              onChange={handleFileChange}
            />
          </div>
          {selectedFile && (
            <div className="p-3 bg-muted/20 rounded-md">
              <p className="text-sm font-medium">Selected file:</p>
              <p className="text-sm">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="button" disabled={!selectedFile}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocumentDialog;
