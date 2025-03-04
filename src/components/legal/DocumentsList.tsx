import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  MoreVertical,
  Download,
  Calendar,
  Building,
  Plus,
} from "lucide-react";
import DocumentDetailsDialog from "./DocumentDetailsDialog";

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

interface DocumentsListProps {
  limit?: number;
  searchQuery?: string;
  categoryFilter?: string | null;
  propertyFilter?: string | null;
}

const mockDocuments: Document[] = [
  {
    id: "doc-001",
    title: "Sunset Apartments Property Deed",
    category: "deed",
    dateAdded: "2022-01-15",
    lastUpdated: "2022-01-15",
    property: "Sunset Apartments",
    description: "Official property deed for Sunset Apartments complex.",
    fileType: "PDF",
    fileSize: "2.4 MB",
  },
  {
    id: "doc-002",
    title: "Highland Towers Building Permit",
    category: "permit",
    dateAdded: "2022-03-10",
    lastUpdated: "2022-03-10",
    property: "Highland Towers",
    description: "Building permit for Highland Towers renovation project.",
    fileType: "PDF",
    fileSize: "1.8 MB",
  },
  {
    id: "doc-003",
    title: "Corporate Bylaws",
    category: "corporate",
    dateAdded: "2021-11-05",
    lastUpdated: "2023-02-20",
    property: "Corporate",
    description: "Company bylaws for Micro Digits Property Management.",
    fileType: "DOCX",
    fileSize: "350 KB",
  },
  {
    id: "doc-004",
    title: "Parkview Residences Certificate of Occupancy",
    category: "certificate",
    dateAdded: "2022-05-18",
    lastUpdated: "2022-05-18",
    property: "Parkview Residences",
    description: "Certificate of occupancy for Parkview Residences.",
    fileType: "PDF",
    fileSize: "1.2 MB",
  },
  {
    id: "doc-005",
    title: "Employee Handbook",
    category: "policy",
    dateAdded: "2022-01-10",
    lastUpdated: "2023-01-15",
    property: "Corporate",
    description: "Employee handbook and company policies.",
    fileType: "PDF",
    fileSize: "4.5 MB",
  },
  {
    id: "doc-006",
    title: "Riverside Condos Zoning Approval",
    category: "permit",
    dateAdded: "2022-07-22",
    lastUpdated: "2022-07-22",
    property: "Riverside Condos",
    description: "Zoning approval for Riverside Condos property.",
    fileType: "PDF",
    fileSize: "1.5 MB",
  },
  {
    id: "doc-007",
    title: "Articles of Incorporation",
    category: "corporate",
    dateAdded: "2021-10-01",
    lastUpdated: "2021-10-01",
    property: "Corporate",
    description:
      "Articles of incorporation for Micro Digits Property Management.",
    fileType: "PDF",
    fileSize: "2.1 MB",
  },
  {
    id: "doc-008",
    title: "Privacy Policy",
    category: "policy",
    dateAdded: "2022-04-15",
    lastUpdated: "2023-03-10",
    property: "Corporate",
    description: "Privacy policy for tenant and employee data.",
    fileType: "DOCX",
    fileSize: "280 KB",
  },
];

const DocumentsList = ({
  limit,
  searchQuery = "",
  categoryFilter = null,
  propertyFilter = null,
}: DocumentsListProps) => {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  // Filter documents based on search query, category, and property
  const filteredDocuments = mockDocuments.filter((document) => {
    const matchesSearch =
      document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      document.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (document.description &&
        document.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (document.property &&
        document.property.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter
      ? document.category === categoryFilter
      : true;

    const matchesProperty = propertyFilter
      ? document.property &&
        document.property.toLowerCase().replace(/\s+/g, "-") === propertyFilter
      : true;

    return matchesSearch && matchesCategory && matchesProperty;
  });

  // Limit the number of documents if specified
  const displayedDocuments = limit
    ? filteredDocuments.slice(0, limit)
    : filteredDocuments;

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

  const handleViewDetails = (document: Document) => {
    setSelectedDocument(document);
    setIsDetailsOpen(true);
  };

  return (
    <div className={cn("bg-card rounded-lg border shadow-sm table-container")}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Legal Documents</h3>
        </div>
        {!limit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/legal/documents/new")}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" /> New Document
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>File Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedDocuments.length > 0 ? (
            displayedDocuments.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium">{document.title}</TableCell>
                <TableCell>{getCategoryBadge(document.category)}</TableCell>
                <TableCell>{document.property || "N/A"}</TableCell>
                <TableCell>{document.dateAdded}</TableCell>
                <TableCell>{document.lastUpdated}</TableCell>
                <TableCell>
                  <Badge variant="outline">{document.fileType}</Badge>
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
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(document)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/legal/documents/${document.id}/edit`)
                        }
                      >
                        Edit Document
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          console.log("Download document", document.id)
                        }
                      >
                        Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No documents found matching your criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {limit && displayedDocuments.length > 0 && (
        <div className="p-4 border-t">
          <Button
            variant="link"
            className="w-full"
            onClick={() => navigate("/legal/documents")}
          >
            View All Documents
          </Button>
        </div>
      )}

      {/* Document Details Dialog */}
      {selectedDocument && (
        <DocumentDetailsDialog
          document={selectedDocument}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default DocumentsList;
