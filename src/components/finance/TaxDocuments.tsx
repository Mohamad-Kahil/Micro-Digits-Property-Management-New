import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText, Upload } from "lucide-react";

const TaxDocuments = () => {
  // Mock tax documents
  const taxDocuments = [
    {
      id: "doc-001",
      name: "Annual Property Tax Statement",
      year: "2023",
      dateUploaded: "2023-04-15",
      type: "Property Tax",
      size: "1.2 MB",
    },
    {
      id: "doc-002",
      name: "Income Tax Return",
      year: "2023",
      dateUploaded: "2023-04-10",
      type: "Income Tax",
      size: "3.5 MB",
    },
    {
      id: "doc-003",
      name: "Depreciation Schedule",
      year: "2023",
      dateUploaded: "2023-04-05",
      type: "Depreciation",
      size: "0.8 MB",
    },
    {
      id: "doc-004",
      name: "1099 Forms",
      year: "2023",
      dateUploaded: "2023-03-20",
      type: "1099",
      size: "0.5 MB",
    },
    {
      id: "doc-005",
      name: "Property Expense Summary",
      year: "2023",
      dateUploaded: "2023-03-15",
      type: "Expense Summary",
      size: "1.7 MB",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Documents</h1>
          <p className="text-muted-foreground mt-2">
            Manage and access your property tax documents.
          </p>
        </div>
        <Button type="button">
          <Upload className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tax Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {doc.name}
                    </div>
                  </TableCell>
                  <TableCell>{doc.year}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.dateUploaded}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxDocuments;
