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
import { Upload, FileUp, Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface BulkUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  title?: string;
  description?: string;
  acceptedFileTypes?: string;
  maxFiles?: number;
}

const BulkUploadDialog = ({
  isOpen,
  onClose,
  onUpload,
  title = "Bulk Upload Documents",
  description = "Upload multiple documents at once.",
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.png",
  maxFiles = 10,
}: BulkUploadDialogProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const newFiles = [...selectedFiles, ...fileArray].slice(0, maxFiles);
      setSelectedFiles(newFiles);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files);
      const newFiles = [...selectedFiles, ...fileArray].slice(0, maxFiles);
      setSelectedFiles(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
      onClose();
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
          <div
            className={`border-2 border-dashed rounded-md p-6 text-center ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileUp className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Drag & Drop Files</h3>
            <p className="text-sm text-muted-foreground mt-2">
              or click to browse files
            </p>
            <Input
              id="bulk-document-upload"
              type="file"
              multiple
              accept={acceptedFileTypes}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              variant="outline"
              className="mt-4"
              onClick={() =>
                document.getElementById("bulk-document-upload")?.click()
              }
              type="button"
            >
              <Upload className="mr-2 h-4 w-4" /> Select Files
            </Button>
          </div>

          {selectedFiles.length > 0 && (
            <>
              <Separator />
              <div>
                <Label className="mb-2 block">
                  Selected Files ({selectedFiles.length}/{maxFiles})
                </Label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto p-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        <div className="overflow-hidden">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(index)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="button"
            disabled={selectedFiles.length === 0}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload {selectedFiles.length}{" "}
            {selectedFiles.length === 1 ? "File" : "Files"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadDialog;
