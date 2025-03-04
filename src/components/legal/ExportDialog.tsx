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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Table, FileSpreadsheet } from "lucide-react";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, options: any) => void;
  title?: string;
  description?: string;
  itemType: "contracts" | "documents" | "compliance" | "report";
  selectedItems?: string[];
}

const ExportDialog = ({
  isOpen,
  onClose,
  onExport,
  title = "Export Data",
  description = "Choose export format and options.",
  itemType,
  selectedItems = [],
}: ExportDialogProps) => {
  const [format, setFormat] = useState("pdf");
  const [options, setOptions] = useState({
    includeMetadata: true,
    includeAttachments: false,
    includeHistory: true,
    includeNotes: true,
    batchExport: selectedItems.length > 1,
  });

  const handleOptionChange = (option: string, value: boolean) => {
    setOptions({
      ...options,
      [option]: value,
    });
  };

  const handleExport = () => {
    onExport(format, options);
    onClose();
  };

  const getItemTypeLabel = () => {
    switch (itemType) {
      case "contracts":
        return "contracts";
      case "documents":
        return "documents";
      case "compliance":
        return "compliance items";
      case "report":
        return "report data";
      default:
        return "items";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
            {selectedItems.length > 0 && (
              <span className="block mt-1">
                {selectedItems.length} {getItemTypeLabel()} selected for export.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <RadioGroup
              defaultValue={format}
              value={format}
              onValueChange={setFormat}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="format-pdf" />
                <Label htmlFor="format-pdf" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> PDF Document
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="format-csv" />
                <Label htmlFor="format-csv" className="flex items-center gap-2">
                  <Table className="h-4 w-4" /> CSV Spreadsheet
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="format-excel" />
                <Label
                  htmlFor="format-excel"
                  className="flex items-center gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" /> Excel Spreadsheet
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Export Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-metadata"
                  checked={options.includeMetadata}
                  onCheckedChange={(checked) =>
                    handleOptionChange("includeMetadata", checked === true)
                  }
                />
                <Label htmlFor="include-metadata">
                  Include metadata (dates, categories, properties)
                </Label>
              </div>

              {(itemType === "contracts" || itemType === "documents") && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-attachments"
                    checked={options.includeAttachments}
                    onCheckedChange={(checked) =>
                      handleOptionChange("includeAttachments", checked === true)
                    }
                  />
                  <Label htmlFor="include-attachments">
                    Include attachments (PDF export only)
                  </Label>
                </div>
              )}

              {(itemType === "contracts" || itemType === "compliance") && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-history"
                    checked={options.includeHistory}
                    onCheckedChange={(checked) =>
                      handleOptionChange("includeHistory", checked === true)
                    }
                  />
                  <Label htmlFor="include-history">Include history</Label>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-notes"
                  checked={options.includeNotes}
                  onCheckedChange={(checked) =>
                    handleOptionChange("includeNotes", checked === true)
                  }
                />
                <Label htmlFor="include-notes">
                  Include notes and comments
                </Label>
              </div>

              {selectedItems.length > 1 && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="batch-export"
                    checked={options.batchExport}
                    onCheckedChange={(checked) =>
                      handleOptionChange("batchExport", checked === true)
                    }
                  />
                  <Label htmlFor="batch-export">
                    Export as a single file (batch export)
                  </Label>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleExport} type="button">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
