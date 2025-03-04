import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  FileCheck,
  Clock,
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Building,
  Edit,
  Download,
  Printer,
  History,
  MessageSquare,
  Upload,
  Share2,
  Lock,
  UserPlus,
  FileSignature,
  BarChart,
} from "lucide-react";
import AddNoteDialog from "./AddNoteDialog";
import UploadDocumentDialog from "./UploadDocumentDialog";
import RenewContractDialog from "./RenewContractDialog";

interface Contract {
  id: string;
  title: string;
  type: string;
  status: "active" | "expiring" | "expired" | "draft";
  startDate: string;
  endDate: string;
  parties: string[];
  value?: number;
  property?: string;
  description?: string;
  fileUrl?: string;
  history?: {
    date: string;
    action: string;
    user: string;
  }[];
  notes?: string[];
  attachments?: { name: string; url: string; type: string }[];
  version?: number;
}

const ContractDetail = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [isRenewOpen, setIsRenewOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [contractNotes, setContractNotes] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string; type: string }[]
  >([]);

  // Mock contract data - in a real app, you would fetch this based on the ID
  const [contract, setContract] = useState<Contract>({
    id: "contract-002",
    title: "Maintenance Service Agreement",
    type: "service",
    status: "expiring",
    startDate: "2023-03-01",
    endDate: "2023-08-31",
    parties: ["Micro Digits Property Management", "Maintenance Pros Inc."],
    value: 24000,
    property: "All Properties",
    description:
      "Quarterly maintenance services for all properties. Includes regular inspections, repairs, and emergency services for HVAC, plumbing, and electrical systems across all managed properties.",
    history: [
      { date: "2023-03-01", action: "Contract created", user: "Admin User" },
      { date: "2023-03-05", action: "Contract signed", user: "Admin User" },
      { date: "2023-06-15", action: "Contract reviewed", user: "Admin User" },
    ],
    notes: [
      "Vendor provides 24/7 emergency services",
      "Quarterly maintenance schedule to be coordinated with property managers",
      "Contract includes parts and labor for standard repairs",
    ],
    attachments: [
      { name: "Maintenance_Agreement.pdf", url: "#", type: "PDF" },
      { name: "Service_Schedule.docx", url: "#", type: "DOCX" },
    ],
    version: 1,
  });

  const getStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "expiring":
        return (
          <Badge className="bg-amber-100 text-amber-800">Expiring Soon</Badge>
        );
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <FileCheck className="h-5 w-5 text-green-500" />;
      case "expiring":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "expired":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "draft":
        return <FileText className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const updateContractStatus = (newStatus: Contract["status"]) => {
    const now = new Date().toISOString().split("T")[0];
    const newHistory = [
      ...(contract.history || []),
      {
        date: now,
        action: `Contract marked as ${newStatus}`,
        user: "Current User",
      },
    ];

    setContract({
      ...contract,
      status: newStatus,
      history: newHistory,
    });
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
              onClick={() => navigate("/legal/contracts")}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {contract.title}
            </h1>
            {getStatusBadge(contract.status)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Valid from {contract.startDate} to {contract.endDate}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => console.log("Download contract")}
            type="button"
          >
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button
            onClick={() => navigate(`/legal/contracts/${contractId}/edit`)}
            type="button"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Contract Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Contract Type</h3>
                      <p className="text-muted-foreground capitalize">
                        {contract.type}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Contract Value</h3>
                      <p className="text-muted-foreground">
                        {contract.value
                          ? `$${contract.value.toLocaleString()}`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Start Date</h3>
                      <p className="text-muted-foreground">
                        {contract.startDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">End Date</h3>
                      <p className="text-muted-foreground">
                        {contract.endDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Status</h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(contract.status)}
                        <span className="capitalize">{contract.status}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Related Property</h3>
                      <p className="text-muted-foreground">
                        {contract.property || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Version</h3>
                      <p className="text-muted-foreground">
                        v{contract.version || 1}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {contract.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contract Parties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contract.parties.map((party, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{party}</div>
                          <div className="text-sm text-muted-foreground">
                            {index === 0 ? "First Party" : "Second Party"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Actions and Timeline */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline" type="button">
                    <Printer className="mr-2 h-4 w-4" /> Print Contract
                  </Button>

                  {contract.status === "expiring" && (
                    <Button
                      className="w-full"
                      type="button"
                      onClick={() => setIsRenewOpen(true)}
                    >
                      <Clock className="mr-2 h-4 w-4" /> Renew Contract
                    </Button>
                  )}

                  {contract.status === "draft" && (
                    <Button
                      className="w-full"
                      type="button"
                      onClick={() => updateContractStatus("active")}
                    >
                      <FileCheck className="mr-2 h-4 w-4" /> Mark as Active
                    </Button>
                  )}

                  {contract.status === "active" && (
                    <Button
                      className="w-full"
                      variant="outline"
                      type="button"
                      onClick={() => updateContractStatus("expired")}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" /> Mark as Expired
                    </Button>
                  )}

                  <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    onClick={() => setIsUploadDocOpen(true)}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Attachment
                  </Button>

                  <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    onClick={() => setIsAddNoteOpen(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Add Note
                  </Button>

                  <Button
                    className="w-full"
                    variant="outline"
                    type="button"
                    onClick={() => setIsShareOpen(true)}
                  >
                    <Share2 className="mr-2 h-4 w-4" /> Share Contract
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Created
                      </div>
                      <div className="font-medium">
                        {contract.history?.[0]?.date || "N/A"}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Start Date
                      </div>
                      <div className="font-medium">{contract.startDate}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        End Date
                      </div>
                      <div className="font-medium">{contract.endDate}</div>
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
                            (new Date(contract.endDate).getTime() -
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
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Contract Documents</CardTitle>
              <Button
                size="sm"
                type="button"
                onClick={() => setIsUploadDocOpen(true)}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...(contract.attachments || []), ...uploadedFiles].length >
                0 ? (
                  [...(contract.attachments || []), ...uploadedFiles].map(
                    (attachment, index) => (
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
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" type="button">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                          <Button variant="ghost" size="sm" type="button">
                            <FileSignature className="h-4 w-4" />
                            <span className="sr-only">Sign</span>
                          </Button>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No documents attached
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload documents related to this contract.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Versions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md bg-muted/10">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        Contract_v{contract.version}.pdf
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Current Version •{" "}
                        {contract.history?.[contract.history.length - 1]
                          ?.date || "N/A"}
                      </div>
                    </div>
                  </div>
                  <Badge>Current</Badge>
                </div>

                {contract.version && contract.version > 1 && (
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">
                          Contract_v{contract.version - 1}.pdf
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Previous Version •{" "}
                          {contract.history?.[0]?.date || "N/A"}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" type="button">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {contract.history?.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="min-w-8 pt-1">
                      <History className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{event.action}</h3>
                        <span className="text-sm text-muted-foreground">
                          {event.date}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        By: {event.user}
                      </p>
                      {index < (contract.history?.length || 0) - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  </div>
                ))}
                {!contract.history?.length && (
                  <div className="text-center py-8">
                    <History className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No history available
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      There is no recorded history for this contract yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Contract Notes</CardTitle>
              <Button
                size="sm"
                type="button"
                onClick={() => setIsAddNoteOpen(true)}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...(contract.notes || []), ...contractNotes].map(
                  (note, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <p>{note}</p>
                    </div>
                  ),
                )}
                {!contract.notes?.length && contractNotes.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No notes available
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      There are no notes for this contract yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Legal Department</div>
                      <div className="text-xs text-muted-foreground">
                        Full access
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Owner</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Finance Department</div>
                      <div className="text-xs text-muted-foreground">
                        View and comment
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Viewer</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Property Managers</div>
                      <div className="text-xs text-muted-foreground">
                        View only
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-800">
                    Restricted
                  </Badge>
                </div>

                <Button className="w-full" variant="outline" type="button">
                  <UserPlus className="mr-2 h-4 w-4" /> Add User or Department
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sharing Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">External Sharing</div>
                      <div className="text-xs text-muted-foreground">
                        Allow sharing with external parties
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" type="button">
                    Disabled
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSignature className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">E-Signature</div>
                      <div className="text-xs text-muted-foreground">
                        Allow electronic signatures
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" type="button">
                    Enabled
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Access Logs</div>
                      <div className="text-xs text-muted-foreground">
                        Track document access
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" type="button">
                    View Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Note Dialog */}
      <AddNoteDialog
        isOpen={isAddNoteOpen}
        onClose={() => setIsAddNoteOpen(false)}
        onAddNote={(note) => setContractNotes([...contractNotes, note])}
        title="Add Contract Note"
        description="Add a note or comment to this contract."
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
        title="Upload Contract Document"
        description="Upload documentation related to this contract."
      />

      {/* Renew Contract Dialog */}
      <RenewContractDialog
        isOpen={isRenewOpen}
        onClose={() => setIsRenewOpen(false)}
        currentEndDate={contract.endDate}
        onRenew={(startDate, endDate) => {
          const now = new Date().toISOString().split("T")[0];
          const newHistory = [
            ...(contract.history || []),
            { date: now, action: "Contract renewed", user: "Current User" },
          ];

          setContract({
            ...contract,
            status: "active",
            startDate,
            endDate,
            history: newHistory,
            version: (contract.version || 1) + 1,
          });
        }}
      />

      {/* Share Contract Dialog */}
      <AddNoteDialog
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        onAddNote={(email) => {
          // In a real app, this would send an invitation to the email
          console.log(`Sharing contract with: ${email}`);
        }}
        title="Share Contract"
        description="Enter the email address of the person you want to share this contract with."
      />
    </div>
  );
};

export default ContractDetail;
