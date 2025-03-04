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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Home,
  User,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
  tenantEmail?: string;
  tenantPhone?: string;
  tenantAvatar?: string;
  assignedTo?: string;
  assignedVendor?: string;
  estimatedCompletion?: string;
  completedDate?: string;
  cost?: number;
  notes?: string;
  images?: string[];
  updates?: {
    id: string;
    date: string;
    user: string;
    message: string;
    status?: string;
  }[];
}

interface MaintenanceRequestDialogProps {
  request: MaintenanceRequest;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
  onAssign: (id: string, staffId: string, vendorId: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (request: MaintenanceRequest) => void;
}

const MaintenanceRequestDialog = ({
  request,
  isOpen,
  onClose,
  onUpdateStatus,
  onAssign,
  onDelete,
  onUpdate,
}: MaintenanceRequestDialogProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] =
    useState<MaintenanceRequest>(request);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    staffId: request.assignedTo || "",
    vendorId: request.assignedVendor || "",
    estimatedCompletion: request.estimatedCompletion || "",
  });
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    message: "",
    status: request.status,
  });

  // Mock data for staff and vendors
  const mockStaff = [
    { id: "staff-001", name: "John Smith" },
    { id: "staff-002", name: "Maria Garcia" },
    { id: "staff-003", name: "Robert Johnson" },
    { id: "staff-004", name: "Mike Davis" },
  ];

  const mockVendors = [
    { id: "vendor-001", name: "Electric Experts LLC" },
    { id: "vendor-002", name: "Plumbing Pros" },
    { id: "vendor-003", name: "HVAC Solutions" },
    { id: "vendor-004", name: "Pest Solutions Inc." },
  ];

  const handleEdit = () => {
    setEditedRequest(request);
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedRequest);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(request.id);
      onClose();
    } else {
      setConfirmDelete(true);
    }
  };

  const handleAssign = () => {
    onAssign(request.id, assignmentData.staffId, assignmentData.vendorId);
    setIsAssigning(false);
  };

  const handleAddUpdate = () => {
    // In a real app, you would save the update to your backend
    console.log("Adding update:", newUpdate);

    // If status is changing, update the request status
    if (newUpdate.status !== request.status) {
      onUpdateStatus(request.id, newUpdate.status);
    }

    setIsAddingUpdate(false);
    setNewUpdate({ message: "", status: request.status });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
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
            Low
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Medium
          </Badge>
        );
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            High
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        {!isEditing ? (
          <>
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl">
                  Request {request.id}
                </DialogTitle>
                <div className="flex items-center gap-2">
                  {getStatusBadge(request.status)}
                  {getPriorityBadge(request.priority)}
                </div>
              </div>
              <DialogDescription>
                <div className="flex items-center text-muted-foreground">
                  <Home className="h-4 w-4 mr-1" />
                  {request.propertyName} • Unit {request.unitNumber} •{" "}
                  <Calendar className="h-4 w-4 mx-1" /> Submitted:{" "}
                  {request.dateSubmitted}
                </div>
              </DialogDescription>
            </DialogHeader>

            <Tabs
              defaultValue="details"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="tenant">Tenant</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-4 mt-4">
                <div>
                  <Label className="text-muted-foreground mb-1 block">
                    Description
                  </Label>
                  <div className="p-3 bg-muted/20 rounded-md">
                    {request.description}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Request Type
                    </Label>
                    <div className="font-medium">{request.requestType}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Date Submitted
                    </Label>
                    <div className="font-medium">{request.dateSubmitted}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Assigned To
                    </Label>
                    <div className="font-medium">
                      {request.assignedTo || "Unassigned"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Vendor
                    </Label>
                    <div className="font-medium">
                      {request.assignedVendor || "Not specified"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Estimated Completion
                    </Label>
                    <div className="font-medium">
                      {request.estimatedCompletion || "Not scheduled"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Estimated Cost
                    </Label>
                    <div className="font-medium">
                      {request.cost
                        ? `$${request.cost.toFixed(2)}`
                        : "Not estimated"}
                    </div>
                  </div>
                </div>

                {request.notes && (
                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Notes
                    </Label>
                    <div className="p-3 bg-muted/20 rounded-md">
                      {request.notes}
                    </div>
                  </div>
                )}

                {/* Assignment Section */}
                {isAssigning ? (
                  <div className="mt-4 p-4 border rounded-md bg-muted/10">
                    <h3 className="font-semibold mb-3">Update Assignment</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="assignedTo">Assigned Staff</Label>
                        <Select
                          value={assignmentData.staffId}
                          onValueChange={(value) =>
                            setAssignmentData({
                              ...assignmentData,
                              staffId: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select staff member" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Unassigned</SelectItem>
                            {mockStaff.map((staff) => (
                              <SelectItem key={staff.id} value={staff.id}>
                                {staff.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="assignedVendor">Vendor</Label>
                        <Select
                          value={assignmentData.vendorId}
                          onValueChange={(value) =>
                            setAssignmentData({
                              ...assignmentData,
                              vendorId: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select vendor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {mockVendors.map((vendor) => (
                              <SelectItem key={vendor.id} value={vendor.id}>
                                {vendor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2 mt-4">
                      <Label htmlFor="estimatedCompletion">
                        Estimated Completion Date
                      </Label>
                      <Input
                        id="estimatedCompletion"
                        type="date"
                        value={assignmentData.estimatedCompletion}
                        onChange={(e) =>
                          setAssignmentData({
                            ...assignmentData,
                            estimatedCompletion: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAssigning(false)}
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAssign} type="button">
                        Save Assignment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsAssigning(true)}
                      type="button"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Change Assignment
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Updates Tab */}
              <TabsContent value="updates" className="space-y-4 mt-4">
                {isAddingUpdate ? (
                  <div className="p-4 border rounded-md bg-muted/10">
                    <h3 className="font-semibold mb-3">Add Update</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newUpdate.status}
                          onValueChange={(value: any) =>
                            setNewUpdate({ ...newUpdate, status: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Update Message</Label>
                        <Textarea
                          id="message"
                          value={newUpdate.message}
                          onChange={(e) =>
                            setNewUpdate({
                              ...newUpdate,
                              message: e.target.value,
                            })
                          }
                          placeholder="Enter update details..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingUpdate(false)}
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddUpdate} type="button">
                        Save Update
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => setIsAddingUpdate(true)} type="button">
                    <Plus className="mr-2 h-4 w-4" /> Add Update
                  </Button>
                )}

                <div className="space-y-4">
                  {request.updates && request.updates.length > 0 ? (
                    request.updates.map((update) => (
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
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">
                        No updates yet
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Add updates to track progress on this maintenance
                        request.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Tenant Tab */}
              <TabsContent value="tenant" className="space-y-4 mt-4">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={
                        request.tenantAvatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${request.tenantName}`
                      }
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

                <div className="space-y-4">
                  {request.tenantEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{request.tenantEmail}</span>
                    </div>
                  )}
                  {request.tenantPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{request.tenantPhone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {request.propertyName}, Unit {request.unitNumber}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  {request.tenantEmail && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open(`mailto:${request.tenantEmail}`, "_blank")
                      }
                      type="button"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Contact Tenant
                    </Button>
                  )}
                </div>
              </TabsContent>

              {/* Images Tab */}
              <TabsContent value="images" className="space-y-4 mt-4">
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
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">
                      No images available
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      There are no images attached to this maintenance request.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between sm:justify-between mt-4">
              <div>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  type="button"
                >
                  {confirmDelete ? "Confirm Delete" : "Delete"}
                </Button>
              </div>
              <div className="flex gap-2">
                {request.status !== "completed" &&
                  request.status !== "cancelled" && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNewUpdate({ ...newUpdate, status: "completed" });
                        setIsAddingUpdate(true);
                        setActiveTab("updates");
                      }}
                      type="button"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
                    </Button>
                  )}
                <Button onClick={handleEdit} type="button">
                  <Edit className="mr-2 h-4 w-4" /> Edit Request
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Edit Maintenance Request</DialogTitle>
              <DialogDescription>
                Update the details of this maintenance request
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="requestType">Request Type</Label>
                  <Input
                    id="requestType"
                    value={editedRequest.requestType}
                    onChange={(e) =>
                      setEditedRequest({
                        ...editedRequest,
                        requestType: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={editedRequest.priority}
                    onValueChange={(value: any) =>
                      setEditedRequest({ ...editedRequest, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedRequest.description}
                  onChange={(e) =>
                    setEditedRequest({
                      ...editedRequest,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedRequest.status}
                    onValueChange={(value: any) =>
                      setEditedRequest({ ...editedRequest, status: value })
                    }
                  >
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
                  <Label htmlFor="cost">Estimated Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={editedRequest.cost || ""}
                    onChange={(e) =>
                      setEditedRequest({
                        ...editedRequest,
                        cost: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={editedRequest.notes || ""}
                  onChange={(e) =>
                    setEditedRequest({
                      ...editedRequest,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Additional notes about this request"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button onClick={handleSave} type="button">
                Save Changes
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceRequestDialog;
