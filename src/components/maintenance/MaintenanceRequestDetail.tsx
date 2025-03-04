import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Home,
  Calendar,
  MessageSquare,
  FileText,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface MaintenanceRequest {
  id: string;
  propertyName: string;
  unitNumber: string;
  requestType: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "emergency";
  dateSubmitted: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  tenantAvatar: string;
  assignedTo?: string;
  assignedVendor?: string;
  estimatedCompletion?: string;
  completedDate?: string;
  cost?: number;
  notes?: string;
  images?: string[];
  updates: {
    id: string;
    date: string;
    user: string;
    message: string;
    status?: string;
  }[];
}

const mockRequest: MaintenanceRequest = {
  id: "MR-1002",
  propertyName: "Sunset Heights",
  unitNumber: "103",
  requestType: "Electrical",
  description:
    "Power outlet not working in living room. I've tried resetting the breaker but it didn't help. The outlet is located on the north wall behind the couch.",
  status: "in-progress",
  priority: "high",
  dateSubmitted: "2023-06-14",
  tenantName: "Michael Chen",
  tenantEmail: "michael.chen@example.com",
  tenantPhone: "(555) 987-6543",
  tenantAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-chen",
  assignedTo: "John Smith",
  assignedVendor: "Electric Experts LLC",
  estimatedCompletion: "2023-06-18",
  cost: 150,
  notes:
    "Technician will need access to the breaker panel. Tenant has been notified to be available between 9am-12pm on 6/18.",
  images: [
    "https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=500&q=80",
    "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?w=500&q=80",
  ],
  updates: [
    {
      id: "upd-1",
      date: "2023-06-14",
      user: "Michael Chen",
      message: "Submitted maintenance request for non-working outlet.",
      status: "pending",
    },
    {
      id: "upd-2",
      date: "2023-06-15",
      user: "Admin",
      message: "Assigned to John Smith from Electric Experts LLC.",
      status: "in-progress",
    },
    {
      id: "upd-3",
      date: "2023-06-15",
      user: "John Smith",
      message:
        "Scheduled visit for 6/18 between 9am-12pm. Will need access to breaker panel.",
    },
    {
      id: "upd-4",
      date: "2023-06-16",
      user: "Admin",
      message: "Tenant has confirmed availability for the scheduled time.",
    },
  ],
};

const MaintenanceRequestDetail = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [newStatus, setNewStatus] = useState(mockRequest.status);
  const [assignedTo, setAssignedTo] = useState(mockRequest.assignedTo || "");
  const [assignedVendor, setAssignedVendor] = useState(
    mockRequest.assignedVendor || "",
  );

  // In a real app, you would fetch the request data based on the ID
  const request = mockRequest;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "in-progress":
        return <Wrench className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100/80">
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100/80">
            Cancelled
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Low Priority
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Medium Priority
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            High Priority
          </Badge>
        );
      case "emergency":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Emergency
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleAddUpdate = () => {
    console.log("Adding update:", {
      message: updateMessage,
      status: newStatus,
    });
    setIsUpdateDialogOpen(false);
    // In a real app, you would save the update to your backend
  };

  const handleAssign = () => {
    console.log("Assigning request:", { assignedTo, assignedVendor });
    setIsAssignDialogOpen(false);
    // In a real app, you would save the assignment to your backend
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
              onClick={() => navigate("/maintenance/requests")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Request {request.id}
            </h1>
            {getStatusBadge(request.status)}
            {getPriorityBadge(request.priority)}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Home className="h-4 w-4 mr-1" />
            {request.propertyName} • Unit {request.unitNumber} •{" "}
            <Calendar className="h-4 w-4 mx-1" /> Submitted:{" "}
            {request.dateSubmitted}
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" /> Add Update
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Update</DialogTitle>
                <DialogDescription>
                  Add a new update to this maintenance request.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Update Message</Label>
                  <Textarea
                    id="message"
                    value={updateMessage}
                    onChange={(e) => setUpdateMessage(e.target.value)}
                    placeholder="Enter update details..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUpdate}>Save Update</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={() => navigate(`/maintenance/requests/${request.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Request Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {request.description}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Request Type</h3>
                      <p className="text-muted-foreground">
                        {request.requestType}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Date Submitted</h3>
                      <p className="text-muted-foreground">
                        {request.dateSubmitted}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Assigned To</h3>
                      <p className="text-muted-foreground">
                        {request.assignedTo || "Unassigned"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Vendor</h3>
                      <p className="text-muted-foreground">
                        {request.assignedVendor || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Estimated Completion
                      </h3>
                      <p className="text-muted-foreground">
                        {request.estimatedCompletion || "Not scheduled"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Estimated Cost</h3>
                      <p className="text-muted-foreground">
                        {request.cost
                          ? `$${request.cost.toFixed(2)}`
                          : "Not estimated"}
                      </p>
                    </div>
                  </div>
                  {request.notes && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">Notes</h3>
                        <p className="text-muted-foreground">{request.notes}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Assignment</CardTitle>
                  <Dialog
                    open={isAssignDialogOpen}
                    onOpenChange={setIsAssignDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Edit className="mr-2 h-4 w-4" /> Change Assignment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Maintenance Request</DialogTitle>
                        <DialogDescription>
                          Assign this request to a staff member or vendor.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="assignedTo">Assigned Staff</Label>
                          <Select
                            value={assignedTo}
                            onValueChange={setAssignedTo}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select staff member" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Unassigned</SelectItem>
                              <SelectItem value="John Smith">
                                John Smith
                              </SelectItem>
                              <SelectItem value="Maria Garcia">
                                Maria Garcia
                              </SelectItem>
                              <SelectItem value="Robert Johnson">
                                Robert Johnson
                              </SelectItem>
                              <SelectItem value="Mike Davis">
                                Mike Davis
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="assignedVendor">Vendor</Label>
                          <Select
                            value={assignedVendor}
                            onValueChange={setAssignedVendor}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select vendor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">None</SelectItem>
                              <SelectItem value="Electric Experts LLC">
                                Electric Experts LLC
                              </SelectItem>
                              <SelectItem value="Plumbing Pros">
                                Plumbing Pros
                              </SelectItem>
                              <SelectItem value="HVAC Solutions">
                                HVAC Solutions
                              </SelectItem>
                              <SelectItem value="Pest Solutions Inc.">
                                Pest Solutions Inc.
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="estimatedCompletion">
                            Estimated Completion Date
                          </Label>
                          <Input
                            id="estimatedCompletion"
                            type="date"
                            defaultValue={request.estimatedCompletion}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAssign}>Save Assignment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=john-smith"
                        alt="Staff"
                      />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {request.assignedTo || "Unassigned"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {request.assignedVendor || "No vendor assigned"}
                      </p>
                      {request.estimatedCompletion && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          Scheduled for: {request.estimatedCompletion}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Tenant Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage
                        src={request.tenantAvatar}
                        alt={request.tenantName}
                      />
                      <AvatarFallback>
                        {request.tenantName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{request.tenantName}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{request.tenantEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{request.tenantPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {request.propertyName}, Unit {request.unitNumber}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" /> Contact Tenant
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">Property</h3>
                      <p className="text-muted-foreground">
                        {request.propertyName}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Unit</h3>
                      <p className="text-muted-foreground">
                        {request.unitNumber}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Home className="mr-2 h-4 w-4" /> View Property Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Updates Tab */}
        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Request Updates</CardTitle>
              <Button size="sm" onClick={() => setIsUpdateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Update
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {request.updates.map((update) => (
                  <div key={update.id} className="flex gap-4">
                    <div className="min-w-8 pt-1">
                      {update.status && getStatusIcon(update.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{update.user}</h3>
                        <span className="text-sm text-muted-foreground">
                          {update.date}
                        </span>
                      </div>
                      <p className="mt-1">{update.message}</p>
                      {update.status && (
                        <div className="mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            Status changed to:{" "}
                            {update.status.charAt(0).toUpperCase() +
                              update.status.slice(1)}
                          </Badge>
                        </div>
                      )}
                      <Separator className="my-4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Request Images</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Upload Images
              </Button>
            </CardHeader>
            <CardContent>
              {request.images && request.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {request.images.map((image, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-md border"
                    >
                      <img
                        src={image}
                        alt={`Request ${request.id} - Image ${index + 1}`}
                        className="w-full h-auto object-cover aspect-video"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No images available for this request.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Related Documents</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No documents yet</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload invoices, contracts, or other documents related to this
                  maintenance request.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceRequestDetail;
