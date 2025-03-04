import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  File,
  Plus,
  Search,
  Download,
  Trash2,
  Share2,
  MoreVertical,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "spreadsheet" | "archive" | "text" | "other";
  size: string;
  uploadedBy: string;
  uploadDate: string;
  category:
    | "lease"
    | "inspection"
    | "maintenance"
    | "financial"
    | "legal"
    | "other";
}

interface PropertyDocumentsProps {
  propertyId: string;
}

const mockDocuments: Record<string, Document[]> = {
  "prop-001": [
    {
      id: "doc-001",
      name: "Lease Agreement - Unit 101.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedBy: "Alex Johnson",
      uploadDate: "2023-05-15",
      category: "lease",
    },
    {
      id: "doc-002",
      name: "Property Inspection Report - 2023.pdf",
      type: "pdf",
      size: "3.8 MB",
      uploadedBy: "Alex Johnson",
      uploadDate: "2023-03-22",
      category: "inspection",
    },
    {
      id: "doc-003",
      name: "Building Exterior Photos.zip",
      type: "archive",
      size: "15.2 MB",
      uploadedBy: "Sarah Miller",
      uploadDate: "2023-02-10",
      category: "other",
    },
    {
      id: "doc-004",
      name: "Maintenance Schedule 2023.xlsx",
      type: "spreadsheet",
      size: "1.1 MB",
      uploadedBy: "Alex Johnson",
      uploadDate: "2023-01-05",
      category: "maintenance",
    },
    {
      id: "doc-005",
      name: "Property Insurance Policy.pdf",
      type: "pdf",
      size: "4.5 MB",
      uploadedBy: "Alex Johnson",
      uploadDate: "2022-12-18",
      category: "legal",
    },
    {
      id: "doc-006",
      name: "Renovation Proposal.pdf",
      type: "pdf",
      size: "2.8 MB",
      uploadedBy: "Sarah Miller",
      uploadDate: "2022-11-30",
      category: "maintenance",
    },
    {
      id: "doc-007",
      name: "Financial Statement - Q4 2022.xlsx",
      type: "spreadsheet",
      size: "1.7 MB",
      uploadedBy: "Alex Johnson",
      uploadDate: "2022-10-15",
      category: "financial",
    },
  ],
  "prop-002": [
    {
      id: "doc-101",
      name: "Lease Agreement - Unit 1A.pdf",
      type: "pdf",
      size: "2.2 MB",
      uploadedBy: "Alex Johnson",
      uploadDate: "2023-04-10",
      category: "lease",
    },
    {
      id: "doc-102",
      name: "Property Tax Assessment.pdf",
      type: "pdf",
      size: "1.5 MB",
      uploadedBy: "Alex Johnson",
      uploadDate: "2023-03-05",
      category: "financial",
    },
  ],
};

export const PropertyDocuments = ({ propertyId }: PropertyDocumentsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const documents = mockDocuments[propertyId] || [];

  const getFileIcon = (type: Document["type"]) => {
    switch (type) {
      case "pdf":
        return <File className="h-4 w-4 text-red-500" />;
      case "image":
        return <File className="h-4 w-4 text-blue-500" />;
      case "spreadsheet":
        return <File className="h-4 w-4 text-green-500" />;
      case "archive":
        return <File className="h-4 w-4 text-amber-500" />;
      case "text":
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === null || doc.category === selectedCategory),
  );

  const categories = [
    { id: "all", name: "All Documents" },
    { id: "lease", name: "Lease Agreements" },
    { id: "inspection", name: "Inspection Reports" },
    { id: "maintenance", name: "Maintenance" },
    { id: "financial", name: "Financial" },
    { id: "legal", name: "Legal Documents" },
    { id: "other", name: "Other" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documents..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Card>
            <CardContent className="p-3">
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="ghost"
                    className={`w-full justify-start ${category.id === selectedCategory ? "bg-muted" : ""}`}
                    onClick={() =>
                      setSelectedCategory(
                        category.id === "all" ? null : category.id,
                      )
                    }
                  >
                    {category.name}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Documents Table */}
        <div className="flex-1">
          <div className="rounded-md border table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFileIcon(doc.type)}
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {doc.category}
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            by {doc.uploadedBy}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" /> Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No documents found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
