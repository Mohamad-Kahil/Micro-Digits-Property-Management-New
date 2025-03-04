import React from "react";
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
} from "lucide-react";

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
}

const ContractDetail = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();

  // Mock contract data - in a real app, you would fetch this based on the ID
  const contract: Contract = {
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
  };

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
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
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
                    <Button className="w-full" type="button">
                      <Clock className="mr-2 h-4 w-4" /> Renew Contract
                    </Button>
                  )}
                  {contract.status === "draft" && (
                    <Button className="w-full" type="button">
                      <FileCheck className="mr-2 h-4 w-4" /> Mark as Active
                    </Button>
                  )}
                  <Button className="w-full" variant="outline" type="button">
                    <MessageSquare className="mr-2 h-4 w-4" /> Add Note
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
              <Button size="sm" type="button">
                <MessageSquare className="mr-2 h-4 w-4" /> Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contract.notes?.map((note, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <p>{note}</p>
                  </div>
                ))}
                {!contract.notes?.length && (
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
      </Tabs>
    </div>
  );
};

export default ContractDetail;
