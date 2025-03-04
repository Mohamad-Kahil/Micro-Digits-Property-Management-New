import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Building,
  User,
  Edit,
  FileText,
  Scale,
} from "lucide-react";
import AddNoteDialog from "./AddNoteDialog";
import UploadDocumentDialog from "./UploadDocumentDialog";

interface ComplianceItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
  property?: string;
  assignedTo?: string;
  description?: string;
  completedDate?: string;
  completedBy?: string;
  notes?: string;
  attachments?: { name: string; url: string; type: string }[];
}

const ComplianceDetail = () => {
  const { complianceId } = useParams<{ complianceId: string }>();
  const navigate = useNavigate();
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string; type: string }[]
  >([]);

  // Mock compliance item data - in a real app, you would fetch this based on the ID
  const [complianceItem, setComplianceItem] = useState<ComplianceItem>({
    id: "comp-001",
    title: "Annual Fire Safety Inspection",
    category: "safety",
    dueDate: "2023-08-15",
    status: "pending",
    property: "All Properties",
    assignedTo: "John Smith",
    description:
      "Annual fire safety inspection required by local regulations. Must be completed by a certified fire safety inspector and documentation must be filed with the local fire department.",
    notes:
      "Contact Fire Safety Pros Inc. to schedule the inspection at least 2 weeks in advance.",
    attachments: [
      { name: "Fire Safety Checklist.pdf", url: "#", type: "PDF" },
      { name: "Previous Inspection Report.pdf", url: "#", type: "PDF" },
    ],
  });

  const getStatusBadge = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: ComplianceItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
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
              onClick={() => navigate("/legal/compliance")}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {complianceItem.title}
            </h1>
            {getStatusBadge(complianceItem.status)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Due Date: {complianceItem.dueDate}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => console.log("Download documentation")}
            type="button"
          >
            <FileText className="mr-2 h-4 w-4" /> Documentation
          </Button>
          <Button
            onClick={() => navigate(`/legal/compliance/${complianceId}/edit`)}
            type="button"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Compliance Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <p className="text-muted-foreground capitalize">
                    {complianceItem.category}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Status</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(complianceItem.status)}
                    <span className="capitalize">{complianceItem.status}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Due Date</h3>
                  <p className="text-muted-foreground">
                    {complianceItem.dueDate}
                  </p>
                </div>
                {complianceItem.completedDate && (
                  <div>
                    <h3 className="font-semibold mb-2">Completed Date</h3>
                    <p className="text-muted-foreground">
                      {complianceItem.completedDate}
                    </p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold mb-2">Property</h3>
                  <p className="text-muted-foreground">
                    {complianceItem.property || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Assigned To</h3>
                  <p className="text-muted-foreground">
                    {complianceItem.assignedTo || "Unassigned"}
                  </p>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {complianceItem.description}
                </p>
              </div>
              {(complianceItem.notes || notes.length > 0) && (
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  {complianceItem.notes && (
                    <p className="text-muted-foreground mb-2">
                      {complianceItem.notes}
                    </p>
                  )}
                  {notes.map((note, index) => (
                    <div key={index} className="p-3 border rounded-md mb-2">
                      <p className="text-muted-foreground">{note}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {[...(complianceItem.attachments || []), ...uploadedFiles].length >
            0 && (
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    ...(complianceItem.attachments || []),
                    ...uploadedFiles,
                  ].map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{attachment.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {attachment.type}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" type="button">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Actions and Timeline */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceItem.status !== "completed" ? (
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => {
                    setComplianceItem({
                      ...complianceItem,
                      status: "completed",
                    });
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setComplianceItem({ ...complianceItem, status: "pending" });
                  }}
                >
                  <Clock className="mr-2 h-4 w-4" /> Mark as Pending
                </Button>
              )}
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => setIsUploadDocOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" /> Upload Documentation
              </Button>
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => setIsAddNoteOpen(true)}
              >
                <User className="mr-2 h-4 w-4" /> Add Note
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium capitalize">
                    {complianceItem.category}
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">Frequency</div>
                  <div className="font-medium">Annual</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">
                    Regulatory Authority
                  </div>
                  <div className="font-medium">Local Fire Department</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-muted-foreground">
                    Days Remaining
                  </div>
                  <div className="font-medium">
                    {Math.max(
                      0,
                      Math.ceil(
                        (new Date(complianceItem.dueDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      ),
                    )}
                  </div>
                </div>
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
        title="Add Compliance Note"
        description="Add a note or comment to this compliance item."
      />

      {/* Upload Document Dialog */}
      <UploadDocumentDialog
        isOpen={isUploadDocOpen}
        onClose={() => setIsUploadDocOpen(false)}
        onUpload={(file) => {
          setUploadedFiles([
            ...uploadedFiles,
            {
              name: file.name,
              url: "#",
              type: file.type.split("/")[1].toUpperCase(),
            },
          ]);
        }}
        title="Upload Compliance Documentation"
        description="Upload documentation related to this compliance item."
      />
    </div>
  );
};

export default ComplianceDetail;
