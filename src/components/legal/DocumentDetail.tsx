import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  FileText,
  Edit,
  Download,
  Printer,
  Calendar,
  Building,
  FileType,
  HardDrive,
} from "lucide-react";

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
  content?: string;
  tags?: string[];
}

const DocumentDetail = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  // Mock document data - in a real app, you would fetch this based on the ID
  const document: Document = {
    id: "doc-001",
    title: "Sunset Apartments Property Deed",
    category: "deed",
    dateAdded: "2022-01-15",
    lastUpdated: "2022-01-15",
    property: "Sunset Apartments",
    description:
      "Official property deed for Sunset Apartments complex. This document establishes legal ownership of the property and contains important information about property boundaries, easements, and restrictions.",
    fileType: "PDF",
    fileSize: "2.4 MB",
    content:
      "This is a placeholder for the document content. In a real application, this would be the actual content of the document or a preview of it.",
    tags: ["deed", "property", "legal", "ownership"],
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-8 w-8"
              onClick={() => navigate("/legal/documents")}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {document.title}
            </h1>
            {getCategoryBadge(document.category)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Added: {document.dateAdded} • Last Updated: {document.lastUpdated}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => console.log("Download document")}
            type="button"
          >
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button
            onClick={() => navigate(`/legal/documents/${documentId}/edit`)}
            type="button"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Document Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {document.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {document.description}
                  </p>
                </div>
              )}
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <p className="text-muted-foreground capitalize">
                    {document.category}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Property</h3>
                  <p className="text-muted-foreground">
                    {document.property || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Date Added</h3>
                  <p className="text-muted-foreground">{document.dateAdded}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Last Updated</h3>
                  <p className="text-muted-foreground">
                    {document.lastUpdated}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">File Type</h3>
                  <p className="text-muted-foreground">{document.fileType}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">File Size</h3>
                  <p className="text-muted-foreground">{document.fileSize}</p>
                </div>
              </div>
              {document.tags && document.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 border rounded-md bg-muted/10 min-h-[300px]">
                {document.content ? (
                  <p>{document.content}</p>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Preview not available
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions and Related */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline" type="button">
                <Download className="mr-2 h-4 w-4" /> Download Document
              </Button>
              <Button className="w-full" variant="outline" type="button">
                <Printer className="mr-2 h-4 w-4" /> Print Document
              </Button>
              <Button className="w-full" variant="outline" type="button">
                <FileText className="mr-2 h-4 w-4" /> Share Document
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">File Type</div>
                  <div className="font-medium flex items-center gap-2">
                    <FileType className="h-4 w-4 text-muted-foreground" />
                    {document.fileType}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">File Size</div>
                  <div className="font-medium flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    {document.fileSize}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">
                    Related Property
                  </div>
                  <div className="font-medium flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {document.property || "N/A"}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">
                    Last Updated
                  </div>
                  <div className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {document.lastUpdated}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-md hover:bg-muted/10 cursor-pointer">
                  <div className="font-medium">Property Purchase Agreement</div>
                  <div className="text-xs text-muted-foreground">
                    Added: 2022-01-10
                  </div>
                </div>
                <div className="p-3 border rounded-md hover:bg-muted/10 cursor-pointer">
                  <div className="font-medium">Property Survey</div>
                  <div className="text-xs text-muted-foreground">
                    Added: 2022-01-12
                  </div>
                </div>
                <div className="p-3 border rounded-md hover:bg-muted/10 cursor-pointer">
                  <div className="font-medium">Title Insurance Policy</div>
                  <div className="text-xs text-muted-foreground">
                    Added: 2022-01-15
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
