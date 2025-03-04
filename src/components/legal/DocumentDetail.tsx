import React, { useState } from "react";
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
import AddNoteDialog from "./AddNoteDialog";
import UploadDocumentDialog from "./UploadDocumentDialog";

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
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isShareDocOpen, setIsShareDocOpen] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [relatedDocs, setRelatedDocs] = useState<
    { title: string; date: string }[]
  >([
    { title: "Property Purchase Agreement", date: "2022-01-10" },
    { title: "Property Survey", date: "2022-01-12" },
    { title: "Title Insurance Policy", date: "2022-01-15" },
  ]);

  // Mock document data - in a real app, you would fetch this based on the ID
  const [document, setDocument] = useState<Document>({
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
  });

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

          {notes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notes.map((note, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <p>{note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
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
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => setIsAddNoteOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" /> Add Note
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
                {relatedDocs.map((doc, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-md hover:bg-muted/10 cursor-pointer"
                  >
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Added: {doc.date}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => setIsShareDocOpen(true)}
                >
                  <FileText className="mr-2 h-4 w-4" /> Link Another Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Note Dialog */}
      <AddNoteDialog
        isOpen={isAddNoteOpen}
        onClose={() => setIsAddNoteOpen(false)}
        onAddNote={(note) => setNotes([...notes, note])}
        title="Add Document Note"
        description="Add a note or comment about this document."
      />

      {/* Link Document Dialog */}
      <AddNoteDialog
        isOpen={isShareDocOpen}
        onClose={() => setIsShareDocOpen(false)}
        onAddNote={(docTitle) => {
          setRelatedDocs([
            ...relatedDocs,
            {
              title: docTitle,
              date: new Date().toISOString().split("T")[0],
            },
          ]);
        }}
        title="Link Related Document"
        description="Enter the title of the related document."
      />
    </div>
  );
};

export default DocumentDetail;
